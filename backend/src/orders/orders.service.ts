import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.order.create({
      data: createOrderDto,
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

  async remove(id: string) {
    return await this.prisma.order.delete({ where: { id } });
  }
}
