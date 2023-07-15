import { Test, TestingModule } from '@nestjs/testing';
import { TestlogController } from './testlog.controller';
import { TestlogService } from './testlog.service';

describe('TestlogController', () => {
  let controller: TestlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestlogController],
      providers: [TestlogService],
    }).compile();

    controller = module.get<TestlogController>(TestlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
