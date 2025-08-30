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
        } else {
          if (event.regularAvailable < ticket.quantity)
            throw new NotFoundException(
              `Not enough REGULAR tickets available.`,
            );
        }
      });

      const total = tickets.reduce((acc, ticket) => {
        if (ticket.type === 'VIP')
          return acc + ticket.quantity * event.vipPrice;
        else if (ticket.type === 'REGULAR')
          return acc + ticket.quantity * event.regularPrice;
        return acc;
      }, 0);

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
    return await this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
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
}
