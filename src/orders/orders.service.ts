import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);
    return await order.save();
  }

  async getAllOrders() {
    return this.orderModel
      .find()
      .populate('products')
      .populate('customer')
      .lean();
  }

  async getOrderById(id: string) {
    return await this.orderModel
      .findById(id)
      .populate('customer')
      .populate('products')
      .lean();
  }

  async updateOrderById(id: string, updateOrderDto: UpdateOrderDto) {
    await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, {
        useFindAndModify: false,
        returnOriginal: false,
        lean: true,
      })
      .lean();
  }

  async deleteOrderById(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
