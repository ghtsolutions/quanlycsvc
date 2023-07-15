import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateLichsuDto } from './dto/create-lichsu.dto';
import { UpdateLichsuDto } from './dto/update-lichsu.dto';
import { LichsuService } from './lichsu.service';

@Controller('test_lichsu')
export class LichsuController {
  constructor(private readonly lichsuService: LichsuService) {}

  @Post()
  create(@Body() createLichsuDto: CreateLichsuDto) {
    return this.lichsuService.create(createLichsuDto);
  }

  @Get()
  findAll() {
    return this.lichsuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lichsuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLichsuDto: UpdateLichsuDto) {
    return this.lichsuService.update(id, updateLichsuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lichsuService.remove(id);
  }
}
