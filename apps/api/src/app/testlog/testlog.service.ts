import { Injectable } from '@nestjs/common';
import { CreateTestlogDto } from './dto/create-testlog.dto';
import { UpdateTestlogDto } from './dto/update-testlog.dto';

@Injectable()
export class TestlogService {
  create(createTestlogDto: CreateTestlogDto) {
    return 'This action adds a new testlog';
  }

  findAll() {
    return `This action returns all testlog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testlog`;
  }

  update(id: number, updateTestlogDto: UpdateTestlogDto) {
    return `This action updates a #${id} testlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} testlog`;
  }
}
