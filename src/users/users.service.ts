import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/service/base.services';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super();
    this.setRepository();
  }

  setRepository() {
    this.repository = this.userRepository;
  }
}
