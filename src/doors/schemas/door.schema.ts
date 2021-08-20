import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
export type DoorDocument = Door & Document;

@Schema({ timestamps: true })
export class Door {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ default: 0 })
  rating: number;
}

export const DoorSchema = SchemaFactory.createForClass(Door);
