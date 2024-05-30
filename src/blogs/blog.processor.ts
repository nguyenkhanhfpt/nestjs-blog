import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { NotificationType } from 'src/notification-types/entities/notification-types.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

const RELEASE_NOTIFICATION_BLOG_PROCESS = 'release-notification-blog';

@Processor('blogs')
export class BlogProcessor {
  private logger = new Logger(BlogProcessor.name);

  static RELEASE_NOTIFICATION_BLOG_PROCESS = RELEASE_NOTIFICATION_BLOG_PROCESS;

  constructor(private notificationService: NotificationsService) {}

  @Process(RELEASE_NOTIFICATION_BLOG_PROCESS)
  async handleReleaseNotificationBlog(job: Job) {
    this.logger.debug('Start queue release notification blog...');
    const { user, blog } = job.data;

    for (let i = 0; i < 50000; i++) {
      console.log(i);
    }

    console.log('Process start...');
    this.notificationService.releaseNotification({
      sender: user,
      type: NotificationType.CREATE_BLOG,
      additionalData: {
        blogId: blog.id,
        blogTitle: blog.title,
      },
    });

    this.logger.debug('Queue release notification blog completed');
  }
}
