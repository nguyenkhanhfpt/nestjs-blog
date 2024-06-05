import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'request_follows' })
export class RequestFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.requestFollows, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @ManyToOne(() => User, (user) => user.followWaitList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_user_id' })
  requestUser: User[];
}
