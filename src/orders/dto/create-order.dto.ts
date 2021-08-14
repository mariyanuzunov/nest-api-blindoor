import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  customer: string;
  @IsNotEmpty()
  products: string[];
  @IsNotEmpty()
  shippingAddress: string;
}
