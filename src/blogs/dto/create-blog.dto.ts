import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { BlogStatus } from "../entities/blog.entity";
import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsEnum(BlogStatus)
    isPublic: number;

    @ValidateNested({each: true})
    @Type(() => CategoryDto)
    categories: CategoryDto[];
}

class CategoryDto {
    @IsNumber()
    id?: number;

    @IsString()
    name?: string;

    Creator?: User;
}
