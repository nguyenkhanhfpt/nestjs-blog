import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BlogStatus } from '../entities/blog.entity';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsEnum(BlogStatus)
  isPublic: number;

  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlogTagDto)
  tags: BlogTagDto[];
}

class CategoryDto {
  @IsNumber()
  id?: number;

  @IsString()
  name?: string;

  Creator?: User;
}

class BlogTagDto {
  @IsString()
  name: string;
}
