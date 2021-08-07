import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  create(@Body() data: CreateDoorDto) {
    return this.doorsService.create(data);
  }

  @Get()
  getAll() {
    return this.doorsService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.doorsService.getOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDoorDto) {
    return this.doorsService.updateOneById(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doorsService.removeOneById(id);
  }
}
