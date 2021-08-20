import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import { Door, DoorDocument } from './schemas/door.schema';

@Injectable()
export class DoorsService {
  constructor(@InjectModel(Door.name) private doorModel: Model<DoorDocument>) {}
  async create(data: CreateDoorDto) {
    const door = new this.doorModel(data);
    return await door.save();
  }

  async getAll() {
    return await this.doorModel.find({}).sort({ createdAt: 'desc' }).lean();
  }

  async getOneById(id: string) {
    return await this.doorModel.findById(id).lean();
  }

  async updateOneById(id: string, updateDoorDto: UpdateDoorDto) {
    return await this.doorModel
      .findByIdAndUpdate(id, updateDoorDto, {
        useFindAndModify: false,
        returnOriginal: false,
        lean: true,
      })
      .lean();
  }

  async removeOneById(id: string) {
    return await this.doorModel.findByIdAndDelete(id).lean();
  }
}
