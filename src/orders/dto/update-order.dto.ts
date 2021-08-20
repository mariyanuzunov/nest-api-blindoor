import { IsIn } from 'class-validator';

export class UpdateOrderDto {
  @IsIn(['регистрирана', 'обработена', 'изпълнена', 'анулирана'])
  status: string;
}
