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

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Req() req, @Body() createBlogDto: CreateBlogDto) {
    let user = await this.usersService.findOne(req.user['sub']);

    if (!user) throw new BadRequestException('User invalid!');

    return this.blogsService.createBlog(user, createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    let blog = await this.blogsService.findOne(id);

    if (!blog) throw new NotFoundException();

    return blog;
  }

  @Patch(':id')
  @UseGuards(BlogGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete(':id')
  @UseGuards(BlogGuard)
  remove(@Param('id') id: number) {
    return this.blogsService.remove(id);
  }
}
