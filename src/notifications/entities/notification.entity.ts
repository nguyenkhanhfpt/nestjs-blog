import { NotificationTypes } from 'src/notification-types/entities/notification-types.entity';
import { NotificationUser } from 'src/notification-users/entities/notification-user.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({
    name: 'additional_data',
    type: 'json',
    nullable: true,
  })
  additionalData: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(
    () => NotificationTypes,
    (notificationType) => notificationType.notifications,
  )
  @JoinColumn({ name: 'notification_type_id' })
  type: NotificationTypes;

  @OneToMany(
    () => NotificationUser,
    (notificationUser) => notificationUser.notification,
  )
  users: NotificationUser[];

  @ManyToOne(() => User, (user) => user.sendNotifications)
  @JoinColumn({ name: 'sender_id' })
  sender: User;
}
