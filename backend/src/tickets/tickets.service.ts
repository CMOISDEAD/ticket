import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return await this.prisma.ticket.create({
      data: createTicketDto,
    });
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.ticket.findUnique({ where: { id } });
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
