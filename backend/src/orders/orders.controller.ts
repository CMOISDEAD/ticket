import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderEntity,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return new OrderEntity(await this.ordersService.create(createOrderDto));
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity })
  async findAll() {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => new OrderEntity(order));
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('id') id: string) {
    return new OrderEntity(await this.ordersService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: OrderEntity })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return new OrderEntity(await this.ordersService.update(id, updateOrderDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderEntity })
  async remove(@Param('id') id: string) {
    return new OrderEntity(await this.ordersService.remove(id));
  }
}
