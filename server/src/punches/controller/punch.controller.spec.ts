import { Test, TestingModule } from '@nestjs/testing';
import { PunchController } from './punch.controller';

describe('PunchController', () => {
  let controller: PunchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PunchController],
    }).compile();

    controller = module.get<PunchController>(PunchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
