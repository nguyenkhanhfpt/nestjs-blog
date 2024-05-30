import { Injectable } from '@nestjs/common';
import { BlogCreatedEvent } from '../events/blog-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { BlogStatus } from '../entities/blog.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BlogProcessor } from '../blog.processor';

@Injectable()
export class BlogCreatedListener {
  constructor(
    @InjectQueue('blogs') private blogQueue: Queue,
  ) {}

  @OnEvent('blog.created')
  handleBlogCreatedEvent(event: BlogCreatedEvent) {
    let { user, additionalData } = event;
    let blog = additionalData.blog;

    if (blog.isPublic == BlogStatus.PRIVATE) {
      return false;
    }

    this.blogQueue.add(BlogProcessor.RELEASE_NOTIFICATION_BLOG_PROCESS, {
      user,
      blog,
    });
  }
}
