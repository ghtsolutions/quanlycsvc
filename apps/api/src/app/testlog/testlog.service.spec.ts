import { Test, TestingModule } from '@nestjs/testing';
import { TestlogService } from './testlog.service';

describe('TestlogService', () => {
  let service: TestlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestlogService],
    }).compile();

    service = module.get<TestlogService>(TestlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
