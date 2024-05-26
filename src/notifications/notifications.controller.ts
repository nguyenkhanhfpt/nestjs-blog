import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UsersService } from 'src/users/users.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService,
    private readonly userService: UsersService
  ) {
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Req() request: Request, @Body() createNotificationDto: CreateNotificationDto) {
    createNotificationDto.sender = await this.userService.findOne(request['user']['sub']) 

    return this.notificationsService.releaseNotification(createNotificationDto);
  }

  @Get()
  findAll() { 
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
