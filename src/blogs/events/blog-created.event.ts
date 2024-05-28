import { User } from "src/users/entities/user.entity";

type BlogCreatedEventType = {
    user: User,
    additionalData?: any,
}

export class BlogCreatedEvent {
    public user;
    public additionalData;

    constructor(param: BlogCreatedEventType) {
        this.user = param.user;
        this.additionalData = param.additionalData;
    }
}