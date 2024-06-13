import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UpdateGuard from './guard/update.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll({
      relations: [
        'followingList.following',
        'followerList.follower',
        'notifications.notification',
        'sendNotifications',
      ],
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneBy({
      where: { id },
      relations: ['requestFollows.requestUser', 'followWaitList.user'],
    });
  }

  @UseGuards(UpdateGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(UpdateGuard)
  @Patch('update-avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file, @Body() body
  ) {
    console.log(file)

    let timestamp = Date.now();

    fs.writeFileSync(`./public/upload/images/users/${timestamp}.jpg`, file.buffer);

    return {
      message: 'Upload success'
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
