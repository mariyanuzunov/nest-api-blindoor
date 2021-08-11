import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';
import { Door, DoorDocument } from './schemas/door.schema';

@Injectable()
export class DoorsService {
  constructor(
    @InjectModel(Door.name) private doorModel: Model<DoorDocument>,
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async create(data: CreateDoorDto) {
    const door = new this.doorModel(data);
    return await door.save();
  }

  async getAll() {
    return await this.doorModel.find({}).populate('buyers').lean();
  }

  async getOneById(id: string) {
    return await this.doorModel.findById(id).populate('buyers').lean();
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

  async buy(doorId: string, token: any) {
    const userId = await this.authService.verifyTokenAndExtraxtId(token);
    try {
      await this.doorModel.findByIdAndUpdate(
        doorId,
        { $push: { buyers: userId } },
        { new: true, useFindAndModify: false },
      );

      await this.userService.buyDoor(userId, doorId);
    } catch (error) {
      console.log(error);
    }
  }
}
