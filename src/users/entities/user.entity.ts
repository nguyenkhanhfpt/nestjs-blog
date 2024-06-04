import { Category } from 'src/categories/entities/category.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Follows } from 'src/follows/entities/follows.entity';
import { NotificationUser } from 'src/notification-users/entities/notification-user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { RequestFollow } from 'src/request-follow/entities/request-follow.entity';

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

  @Column({ name: 'is_private', type: 'bool', default: false })
  isPrivate: boolean;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Category, (category) => category.Creator)
  categories: Category[];

  @OneToMany(() => Follows, (follows) => follows.following)
  followerList: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  followingList: Follows[];

  @OneToMany(() => NotificationUser, (notification) => notification.user)
  notifications: NotificationUser[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sendNotifications: Notification[];

  @OneToMany(() => RequestFollow, (requestFollow) => requestFollow.user)
  requestFollows: RequestFollow[];

  @OneToMany(() => RequestFollow, (requestFollow) => requestFollow.requestUser)
  followWaitList: RequestFollow[];
}
