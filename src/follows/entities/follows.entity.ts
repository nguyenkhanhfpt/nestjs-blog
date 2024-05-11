import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'follow_users' })
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

//   @Column({ name: 'follower_id' })
//   followerId: number;

//   @Column({ name: 'user_id' })
//   userId: number;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
}
