import { Test, TestingModule } from '@nestjs/testing';
import { RequestFollowController } from './request-follow.controller';
import { RequestFollowService } from './request-follow.service';

describe('RequestFollowController', () => {
  let controller: RequestFollowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestFollowController],
      providers: [RequestFollowService],
    }).compile();

    controller = module.get<RequestFollowController>(RequestFollowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
