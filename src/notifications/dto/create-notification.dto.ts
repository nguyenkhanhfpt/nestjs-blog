import { IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateNotificationDto {
    @IsNumber()
    type: number;

    sender: User;

    targetUser?: User;
}
