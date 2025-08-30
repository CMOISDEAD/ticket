/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'nestjs-prisma';
import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class PaymentsService {
  private client: MercadoPagoConfig;
  constructor(
    private prisma: PrismaService,
    private ordersService: OrdersService,
  ) {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });
  }

  async webhook(mpPayloadDto: any) {
    if (mpPayloadDto.type !== 'payment') return;
    const request = new Payment(this.client);

    const response = await request.get({
      id: mpPayloadDto.data.id,
    });

    if (response.status === 'approved') {
      const payment = await this.prisma.payment.update({
        where: {
          id: response.external_reference!,
        },
        data: {
          status: 'APPROVED',
        },
      });
      await this.ordersService.approved(payment.orderId);
    } else if (response.status === 'rejected') {
      console.log('rejected payment');
      const payment = await this.prisma.payment.update({
        where: {
          id: response.external_reference!,
        },
        data: {
          status: 'REJECTED',
        },
      });
      await this.ordersService.rejected(payment.orderId);
    }
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const { orderId, method } = createPaymentDto;
    const order = await this.ordersService.findOne(orderId);

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    if (order.status === 'COMPLETED')
      throw new NotFoundException('The order is already paid.');

    if (order.status === 'CANCELLED')
      throw new NotFoundException('The order not aviable.');

    const payment = await this.prisma.payment.create({
      data: {
        ammount: order.total,
        status: 'PENDING',
        method,
        order: {
          connect: {
            id: order.id,
          },
        },
      },
    });

    const preference = new Preference(this.client);

    const response = await preference.create({
      body: {
        items: order.tickets.map((ticket) => ({
          id: ticket.id,
          title: `ticket ${ticket.type}`,
          quantity: 1,
          unit_price: ticket.price,
          currency_id: 'COP',
        })),
        back_urls: {
          success: `${process.env.BACKEND_URL}/payments/success`,
          failure: `${process.env.BACKEND_URL}/payments/failure`,
          pending: `${process.env.BACKEND_URL}/payments/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.BACKEND_URL}/payments/webhook`,
        external_reference: payment.id,
      },
    });

    return {
      init_point: response.init_point,
      payment_id: payment.id,
    };
  }

  async findAll() {
    return await this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.payment.delete({ where: { id } });
  }
}
