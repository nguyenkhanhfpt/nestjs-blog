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
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UsersService } from 'src/users/users.service';
import { BlogGuard } from './guard/blog.guard';
import { CacheService } from 'src/common/service/cache.services';
import { BlogStatus } from './entities/blog.entity';
import { AccessBlogGuard } from './guard/access-blog.guard';

@Controller('blogs')
export class BlogsController {
  private BLOG_REDIS = 'blog-redis';

  constructor(
    private readonly blogsService: BlogsService,
    private readonly usersService: UsersService,
    private readonly cacheService: CacheService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Req() req, @Body() createBlogDto: CreateBlogDto) {
    let user = await this.usersService.findOne(req.user['sub']);

    if (!user) throw new BadRequestException('User invalid!');

    return this.blogsService.createBlog(user, createBlogDto);
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
      });

      await this.cacheService.setCache(this.BLOG_REDIS, blogs);
    }

    blogs = await this.blogsService.findAll({
      where: {
        isPublic,
      },
      relations: ['blogCategories.category']
    });

    return blogs;
  }

  @Get(':id')
  @UseGuards(AccessBlogGuard)
  async findOne(@Param('id') id: number) {
    let blog = await this.blogsService.findOneBy({
      where: {id},
      relations: ['blogCategories.category']
    });

    if (!blog) throw new NotFoundException();

    return blog;
  }

  @Patch(':id')
  @UseGuards(BlogGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updateBlog(id, updateBlogDto);
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
