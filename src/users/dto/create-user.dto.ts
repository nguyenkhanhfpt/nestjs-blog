import { IsBoolean, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    bio: string;

    @IsBoolean()
    isPrivate: boolean;

    avatar?: string;
}
