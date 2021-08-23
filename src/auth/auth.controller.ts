import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile/:id')
  async getUser(
    @Param('id') id: string,
    @Headers('Authorization') token: string,
  ) {
    return await this.authService.getProfile(id, token);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/register')
  async register(@Body(ValidationPipe) userData: RegisterUserDto) {
    console.log('register controller');
    return await this.authService.register(userData);
  }
}
