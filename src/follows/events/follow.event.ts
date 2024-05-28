import { User } from "src/users/entities/user.entity"

type FollowEventType = {
    sender: User,
    targetUser: User
}

export class FollowEvent {
    public sender;
    public targetUser;

    constructor(param: FollowEventType) {
        this.sender = param.sender;
        this.targetUser = param.targetUser;
    }
}
