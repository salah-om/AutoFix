import { Test, TestingModule } from '@nestjs/testing';
import { FixService } from './fix.service';

describe('FixService', () => {
  let service: FixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixService],
    }).compile();

    service = module.get<FixService>(FixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
