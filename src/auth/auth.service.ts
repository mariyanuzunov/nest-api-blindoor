import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    try {
      const user = await this.userService.getUser(credentials.email);
      const isValid = await bcrypt.compare(
        credentials.password,
        user?.password,
      );
      if (user && isValid) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid e-mail or password.');
    }

    return null;
  }

  async login(user: IUser) {
    const accessToken = this.jwtService.sign({
      id: user._id,
      email: user.email,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        displayName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
      },
      accessToken,
    };
  }

  async register(userData: RegisterUserDto) {
    userData.password = await bcrypt.hash(userData.password, 10);
    await this.userService.create(userData);
  }
}
