import { Injectable } from '@nestjs/common';
import { BlogCreatedEvent } from '../events/blog-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notification-types/entities/notification-types.entity';
import { BlogStatus } from '../entities/blog.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BlogCreatedListener {
  constructor(
    private notificationService: NotificationsService,
    @InjectQueue('blogs') private blogQueue: Queue,
  ) {}

  @OnEvent('blog.created')
  handleBlogCreatedEvent(event: BlogCreatedEvent) {
    let { user, additionalData } = event;
    let blog = additionalData.blog;

    if (blog.isPublic == BlogStatus.PRIVATE) {
      return false;
    }

    this.blogQueue.add(
      'release-notification-blog',
      {user, blog},
    );

    this.notificationService.releaseNotification({
      sender: user,
      type: NotificationType.CREATE_BLOG,
      additionalData: {
        blogId: blog.id,
        blogTitle: blog.title,
      },
    });
  }
}
