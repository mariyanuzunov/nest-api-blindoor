import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  @Role('admin')
  create(@Body() data: CreateDoorDto) {
    return this.doorsService.create(data);
  }

  @Public()
  @Get()
  getAll() {
    return this.doorsService.getAll();
  }

  @Public()
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.doorsService.getOneById(id);
  }

  @Patch(':id')
  @Role('admin')
  update(@Param('id') id: string, @Body() data: UpdateDoorDto) {
    return this.doorsService.updateOneById(id, data);
  }

  @Delete(':id')
  @Role('admin')
  remove(@Param('id') id: string) {
    return this.doorsService.removeOneById(id);
  }

  @Post('/buy/:id')
  async buy(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.doorsService.buy(id, token);
  }
}
