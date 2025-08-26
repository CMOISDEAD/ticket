import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}

  async create(createVenueDto: CreateVenueDto) {
    return await this.prisma.venue.create({
      data: createVenueDto,
    });
  }

  async findAll() {
    return await this.prisma.venue.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.venue.findUnique({ where: { id } });
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    return await this.prisma.venue.update({
      where: { id },
      data: updateVenueDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.venue.delete({
      where: { id },
    });
  }
}
