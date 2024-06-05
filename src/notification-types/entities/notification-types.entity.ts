import { Notification } from 'src/notifications/entities/notification.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum NotificationType {
  CREATE_BLOG = 1,
  FOLLOW = 2,
  REQUEST_FOLLOW = 3,
  ACCEPT_REQUEST_FOLLOW = 4
}

@Entity({ name: 'notification_types' })
export class NotificationTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: NotificationType,
    unique: true
  })
  type: NotificationType;

  @OneToMany(() => Notification, (notification) => notification.type)
  notifications: Notification[];
}
