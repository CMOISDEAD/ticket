import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  total: number;

  @ApiProperty({
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'EXPIRED'],
  })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ required: false, type: UserEntity })
  user: UserEntity;

  constructor({ user, ...data }: Partial<OrderEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
