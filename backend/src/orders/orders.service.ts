import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: {
          id: createOrderDto.eventId,
        },
      });

      if (!event)
        throw new NotFoundException(
          `Event with id ${createOrderDto.eventId} not found.`,
        );

      const { tickets, ...data } = createOrderDto;

      tickets.forEach((ticket) => {
        if (ticket.type === 'VIP') {
          if (event.vipAvailable < ticket.quantity)
            throw new NotFoundException(`Not enough VIP tickets available.`);
        } else if (ticket.type === 'REGULAR') {
          if (event.regularAvailable < ticket.quantity)
            throw new NotFoundException(
              `Not enough REGULAR tickets available.`,
            );
        }
      });

      let vipCount = 0,
        regularCount = 0;

      const total = tickets.reduce((acc, ticket) => {
        if (ticket.type === 'VIP') {
          vipCount += ticket.quantity;
          return acc + ticket.quantity * event.vipPrice;
        } else if (ticket.type === 'REGULAR') {
          regularCount += ticket.quantity;
          return acc + ticket.quantity * event.regularPrice;
        }
        return acc;
      }, 0);

      await this.prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          regularReserved: {
            increment: regularCount,
          },
          vipReserved: {
            increment: vipCount,
          },
        },
      });

      return await tx.order.create({
        data: {
          ...data,
          total,
          status: 'PENDING',
          tickets: {
            create: tickets.flatMap((ticket) =>
              Array.from({ length: ticket.quantity }).map(() => ({
                type: ticket.type,
                price:
                  ticket.type === 'VIP' ? event.vipPrice : event.regularPrice,
                status: 'RESERVED',
                event: { connect: { id: event.id } },
              })),
            ),
          },
        },
        include: {
          tickets: true,
        },
      });
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        tickets: true,
        payment: true,
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        tickets: true,
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ${id} not found.`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  // TODO: use a prisma transaction to remove the order and remove the tickets, just for dev purposes
  async remove(id: string) {
    return await this.prisma.order.delete({ where: { id } });
  }

  async approved(orderId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'COMPLETED',
          tickets: {
            updateMany: {
              where: {},
              data: {
                status: 'SOLD',
              },
            },
          },
        },
        include: {
          tickets: true,
        },
      });

      const regularCount = this.getCount('REGULAR', order.tickets);
      const vipCount = this.getCount('VIP', order.tickets);

      await tx.event.update({
        where: {
          id: order.eventId,
        },
        data: {
          regularReserved: {
            decrement: regularCount,
          },
          regularSold: {
            increment: regularCount,
          },
          vipReserved: {
            decrement: vipCount,
          },
          vipSold: {
            increment: vipCount,
          },
        },
      });
    });
  }

  // payment rejected, but order still pending...
  async rejected(orderId: string) {
    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'PENDING',
        tickets: {
          updateMany: {
            where: {},
            data: {
              status: 'RESERVED',
            },
          },
        },
      },
    });
  }

  async cancelled(orderId: string) {
    await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: 'CANCELLED',
          tickets: {
            updateMany: {
              where: {},
              data: {
                status: 'AVAILABLE',
              },
            },
          },
        },
        include: {
          tickets: true,
        },
      });

      const regularCount = this.getCount('REGULAR', order.tickets);
      const vipCount = this.getCount('VIP', order.tickets);

      // TODO: move this kind of function to event service as `decrementReserved`....
      await tx.event.update({
        where: {
          id: order.eventId,
        },
        data: {
          regularReserved: {
            decrement: regularCount,
          },
          vipReserved: {
            decrement: vipCount,
          },
        },
      });
    });
  }

  getCount(type: 'REGULAR' | 'VIP', tickets: { type: string }[]) {
    return tickets.filter((ticket) => ticket.type === type).length;
  }
}
