import { IsEmpty, IsEnum, IsNotEmpty } from "class-validator";
import { BlogStatus } from "../entities/blog.entity";

export class CreateBlogDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @IsEnum(BlogStatus)
    isPublic: number;
}
