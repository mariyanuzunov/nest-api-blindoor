import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: RegisterUserDto) {
    const exists = await this.getUser({ email: userData.email });
    if (exists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'A user with this e-mail address already exists.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const user = new this.userModel(userData);
    await user.save();
  }

  async getUser(param: { email?: string; id?: string }) {
    if (param.email) {
      return await await this.userModel
        .findOne({ email: param.email })
        .populate('itemsBought')
        .lean();
    } else {
      return await this.userModel
        .findById(param.id)
        .populate('itemsBought')
        .lean();
    }
  }

  async buyDoor(userId: string, doorId: string) {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { itemsBought: doorId } },
      { new: true, useFindAndModify: false },
    );
  }
}
