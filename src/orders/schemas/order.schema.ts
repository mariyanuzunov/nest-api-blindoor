import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Door } from 'src/doors/schemas/door.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  customer: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: Door.name, required: true }] })
  products: Door[];

  @Prop({ required: true })
  shippingAddress: string;

  @Prop({ required: true, default: 'регистрирана' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
