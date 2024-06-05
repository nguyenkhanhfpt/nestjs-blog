import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/service/base.services';
import { RequestFollow } from './entities/request-follow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestFollowService extends BaseService {
  constructor(
    @InjectRepository(RequestFollow)
    private requestFollowRepository: Repository<RequestFollow>,
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.requestFollowRepository;
  }
}
