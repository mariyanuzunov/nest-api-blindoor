import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { DoorSchema, Door } from './schemas/door.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Door.name, schema: DoorSchema }]),
  ],
  controllers: [DoorsController],
  providers: [DoorsService],
})
export class DoorsModule {}
