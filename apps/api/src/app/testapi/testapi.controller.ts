import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestapiService } from './testapi.service';
import { CreateTestapiDto } from './dto/create-testapi.dto';
import { UpdateTestapiDto } from './dto/update-testapi.dto';

@Controller('testapi')
export class TestapiController {
  constructor(private readonly testapiService: TestapiService) {}

  @Post()
  create(@Body() createTestapiDto: CreateTestapiDto) {
    return this.testapiService.create(createTestapiDto);
  }

  @Get()
  findAll() {
    return this.testapiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testapiService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestapiDto: UpdateTestapiDto) {
    return this.testapiService.update(id, updateTestapiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testapiService.remove(id);
  }
}
