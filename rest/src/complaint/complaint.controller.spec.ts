import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintController } from './complaint.controller';

describe('ComplaintController', () => {
  let controller: ComplaintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintController],
    }).compile();

    controller = module.get<ComplaintController>(ComplaintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
