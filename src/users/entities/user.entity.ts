import { Category } from 'src/categories/entities/category.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Follows } from 'src/follows/entities/follows.entity';
import { NotificationUser } from 'src/notification-users/entities/notification-user.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'bio', nullable: true })
  bio: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Category, (category) => category.Creator)
  categories: Category[];

  // @ManyToMany((type) => User, (user) => user.following)
  // @JoinTable()
  // followers: User[];

  // @ManyToMany((type) => User, (user) => user.followers)
  // following: User[];

  @OneToMany(() => Follows, (follows) => follows.following)
  followerList: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  followingList: Follows[];

  @OneToMany(() => NotificationUser, (notification) => notification.user)
  notifications: NotificationUser[];
}
