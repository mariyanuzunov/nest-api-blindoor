import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';
// import { Door } from 'src/doors/schemas/door.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Door' }] })
  // doorsBought: Door[];

  @Prop({ default: 'customer' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
