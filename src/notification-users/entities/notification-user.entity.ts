import { Notification } from 'src/notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification_users' })
export class NotificationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Notification, (notification) => notification.users)
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;

  @Column({
    type: 'bool',
    name: 'is_read',
    default: false
  })
  isRead: boolean;
}
