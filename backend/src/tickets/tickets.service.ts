import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  // FIX: elimino esta funcion ?
  async create(createTicketDto: CreateTicketDto) {
    return this.prisma.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: {
          id: createTicketDto.eventId,
        },
      });

      if (!event) {
        throw new NotFoundException(
          `Event with ID ${createTicketDto.eventId} not found`,
        );
      }

      if (createTicketDto.type === 'REGULAR') {
        if (event.regularAvailable >= 0)
          throw new NotFoundException('No regular tickets available');
      } else {
        if (event.vipAvailable >= 0)
          throw new NotFoundException('No vip tickets available');
      }

      const ticket = await tx.ticket.create({
        data: {
          ...createTicketDto,
          status: 'SOLD',
        },
      });

      await tx.event.update({
        where: { id: event.id },
        data:
          createTicketDto.type === 'REGULAR'
            ? { regularAvailable: { decrement: 1 } }
            : {
                vipAvailable: { decrement: 1 },
              },
      });

      return ticket;
    });
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    return await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.ticket.delete({ where: { id } });
  }
}
