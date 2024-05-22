import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'follow_users' })
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'followerId'})
  followerId: number;

  @Column({name: 'followingId'})
  followingId: number;

  @ManyToOne(() => User, (user) => user.followerList, { onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followingList, { onDelete: 'CASCADE' })
  following: User;
}