import { Test, TestingModule } from '@nestjs/testing';
import { RequestFollowService } from './request-follow.service';

describe('RequestFollowService', () => {
  let service: RequestFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestFollowService],
    }).compile();

    service = module.get<RequestFollowService>(RequestFollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
