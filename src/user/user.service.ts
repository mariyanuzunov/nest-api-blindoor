import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: RegisterUserDto) {
    const exists = await this.getUser(userData.email);
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

  async getUser(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }
}
