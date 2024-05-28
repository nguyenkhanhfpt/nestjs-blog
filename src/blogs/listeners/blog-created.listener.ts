import { Injectable } from '@nestjs/common';
import { BlogCreatedEvent } from '../events/blog-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notification-types/entities/notification-types.entity';
import { BlogStatus } from '../entities/blog.entity';

@Injectable()
export class BlogCreatedListener {
  constructor(private notificationService: NotificationsService) {}

  @OnEvent('blog.created')
  handleBlogCreatedEvent(event: BlogCreatedEvent) {
    let { user, additionalData } = event;
    let blog = additionalData.blog;

    if (blog.isPublic == BlogStatus.PRIVATE) {
        return false;
    }

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
