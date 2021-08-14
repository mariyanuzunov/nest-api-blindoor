import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsIn(['регистрирана', 'обработена', 'изпълнена', 'анулирана'])
  status: string;
}
