import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestlogService } from './testlog.service';
import { CreateTestlogDto } from './dto/create-testlog.dto';
import { UpdateTestlogDto } from './dto/update-testlog.dto';

@Controller('testlog')
export class TestlogController {
  constructor(private readonly testlogService: TestlogService) {}

  @Post()
  create(@Body() createTestlogDto: CreateTestlogDto) {
    return this.testlogService.create(createTestlogDto);
  }

  @Get()
  findAll() {
    return this.testlogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testlogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestlogDto: UpdateTestlogDto) {
    return this.testlogService.update(+id, updateTestlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testlogService.remove(+id);
  }
}
