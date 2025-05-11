import { Test, TestingModule } from '@nestjs/testing';
import { FixResolver } from './fix.resolver';

describe('FixResolver', () => {
  let controller: FixResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixResolver],
    }).compile();

    controller = module.get<FixResolver>(FixResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
