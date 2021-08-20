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
    const orders = await this.orderModel
      .find()
      .sort({ createdAt: 'desc' })
      .populate('products')
      .populate('customer', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
      })
      .lean();

    orders.map((order) => {
      order.customer.displayName =
        order.customer.firstName + ' ' + order.customer.lastName;
    });

    return orders;
  }
  // TODO FIX DUP
  async getUserOrders(userId: string) {
    return this.orderModel
      .find({ customer: userId })
      .sort({ createdAt: 'desc' })
      .populate('products')
      .populate('customer', {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
      })
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
