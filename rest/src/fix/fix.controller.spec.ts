import { Test, TestingModule } from '@nestjs/testing';
import { FixController } from './fix.controller';

describe('FixController', () => {
  let controller: FixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixController],
    }).compile();

    controller = module.get<FixController>(FixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
