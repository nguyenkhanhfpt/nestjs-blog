import { Controller } from '@nestjs/common';
import { RequestFollowService } from './request-follow.service';

@Controller('request-follow')
export class RequestFollowController {
  constructor(private readonly requestFollowService: RequestFollowService) {}
}
