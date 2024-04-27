import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignUpDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    password: string;

    bio: string;
}
