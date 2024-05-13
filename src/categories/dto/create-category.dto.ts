import { IsString, MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(255)
    name: string;

    Creator?: User;
}
