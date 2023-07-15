import { Module } from '@nestjs/common';
import { TestlogService } from './testlog.service';
import { TestlogController } from './testlog.controller';

@Module({
  controllers: [TestlogController],
  providers: [TestlogService]
})
export class TestlogModule {}
