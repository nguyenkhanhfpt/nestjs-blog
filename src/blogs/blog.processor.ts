import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('blogs')
export class BlogProcessor {
  private logger = new Logger(BlogProcessor.name);

  @Process('release-notification-blog')
  async handleReleaseNotificationBlog(job: Job) {
    this.logger.debug('Start queue release notification blog...');

    setTimeout(() => {
        this.logger.debug('Queue release notification blog completed');
    }, 3000);
  }
}
