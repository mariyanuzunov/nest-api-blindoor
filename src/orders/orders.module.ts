import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    AuthModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
