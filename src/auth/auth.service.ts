import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginCredentialsDto): Promise<IUser> {
    const user = await this.userService.getUser(credentials.email);
    const isValid = await bcrypt.compare(credentials.password, user?.password);

    if (user && isValid) {
      return user;
    }

    return null;
  }

  async login(user: IUser) {
    const accessToken = this.jwtService.sign({
      email: user.email,
      sub: user._id,
    });

    return {
      ...user,
      accessToken,
    };
  }

  async register(userData: RegisterUserDto) {
    userData.password = await bcrypt.hash(userData.password, 10);
    await this.userService.create(userData);
  }
}
