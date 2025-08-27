import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return await this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return await this.prisma.event.findMany();
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.event.delete({
      where: { id },
    });
  }
}
