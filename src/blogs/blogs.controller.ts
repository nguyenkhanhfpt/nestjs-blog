import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  BadRequestException,
  NotFoundException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UsersService } from 'src/users/users.service';
import { BlogGuard } from './guard/blog.guard';
import { CacheService } from 'src/common/service/cache.services';
import { BlogStatus } from './entities/blog.entity';
import { AccessBlogGuard } from './guard/access-blog.guard';
import { CategoriesService } from 'src/categories/categories.service';
import { BlogCategoriesService } from 'src/blog-categories/blog-categories.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BlogCreatedEvent } from './events/blog-created.event';
import { BlogInterceptor } from 'src/common/interceptors';

@Controller('blogs')
@UseInterceptors(BlogInterceptor)
export class BlogsController {
  private BLOG_REDIS = 'blog-redis';

  constructor(
    private readonly blogsService: BlogsService,
    private readonly usersService: UsersService,
    private readonly cacheService: CacheService,
    private readonly categoryService: CategoriesService,
    private readonly blogCategoriesService: BlogCategoriesService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Req() req, @Body() createBlogDto: CreateBlogDto) {
    let user = await this.usersService.findOne(req.user['sub']);

    if (!user) throw new BadRequestException('User invalid!');

    let categories = await this.categoryService.createOrGetCategoryByConditions(
      createBlogDto.categories,
      user,
    );
    const blog = await this.blogsService.createBlog(user, createBlogDto);
    await this.blogCategoriesService.createMany(blog, categories);

    this.eventEmitter.emitAsync(
      'blog.created',
      new BlogCreatedEvent({
        user,
        additionalData: {
          blog,
        },
      }),
    );

    return blog;
  }

  @Get()
  async findAll() {
    let isPublic = BlogStatus.PUBLIC;
    let blogs = await this.cacheService.getCache(this.BLOG_REDIS);

    if (blogs == undefined) {
      blogs = await this.blogsService.findAll({
        where: {
          isPublic,
        },
        relations: ['blogCategories.category'],
      });

      await this.cacheService.setCache(this.BLOG_REDIS, blogs);
    }

    blogs = await this.blogsService.findAll({
      where: {
        isPublic,
      },
      relations: ['blogCategories.category'],
    });

    return blogs;
  }

  @Get(':id')
  @UseGuards(AccessBlogGuard)
  async findOne(@Param('id') id: number) {
    let blog = await this.blogsService.findOneBy({
      where: { id },
      relations: ['blogCategories.category', 'tags'],
    });

    if (!blog) throw new NotFoundException();

    return blog;
  }

  @Patch(':id')
  @UseGuards(BlogGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    let user = await this.usersService.findOne(req.user['sub']);
    let categories = await this.categoryService.createOrGetCategoryByConditions(
      updateBlogDto?.categories || [],
      user,
    );
    const blog = await this.blogsService.updateBlog(id, updateBlogDto);

    await this.blogCategoriesService.deleteByBlog(blog);
    this.blogCategoriesService.createMany(blog, categories);

    return blog;
  }

  @Delete(':id')
  @UseGuards(BlogGuard)
  remove(@Param('id') id: number) {
    return this.blogsService.remove(id);
  }

  @Get('/user/:id')
  async findAllByUser(@Param('id') id: number) {
    return await this.blogsService.getBlogsByUser(id);
  }
}
