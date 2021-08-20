import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() data, @Headers('Authorization') token: string) {
    const customer = await this.authService.verifyTokenAndExtraxtId(token);
    const orderDetails: CreateOrderDto = { customer, ...data };
    return this.ordersService.createOrder(orderDetails);
  }

  @Get()
  @Role('admin')
  getAll() {
    return this.ordersService.getAllOrders();
  }

  @Get('/my-orders')
  async getUserOrders(@Headers('Authorization') token: string) {
    const userId = await this.authService.verifyTokenAndExtraxtId(token);
    return this.ordersService.getUserOrders(userId);
  }

  @Get(':id')
  @Role('admin')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id')
  @Role('admin')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.ordersService.updateOrderById(id, data);
  }

  @Delete(':id')
  @Role('admin')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrderById(id);
  }
}
