import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileModule } from 'src/common/module/files.module';
import { FilesService } from 'src/common/service/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FileModule],
  controllers: [UsersController],
  providers: [UsersService, FilesService],
  exports: [UsersService]
})
export class UsersModule {}
