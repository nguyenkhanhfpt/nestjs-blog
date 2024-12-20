import { BlogCategories } from 'src/blog-categories/entities/blog-categories.entity';
import { BlogTag } from 'src/blog-tags/entities/blog-tags.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BlogStatus {
  PUBLIC = 1,
  PRIVATE = 0,
}

@Entity({ name: 'blogs' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({
    name: 'is_public',
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.PUBLIC,
  })
  isPublic: BlogStatus;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @OneToMany(() => BlogCategories, (blogCategory) => blogCategory.blog)
  blogCategories: BlogCategories[];

  @OneToMany(() => BlogTag, (blogTag) => blogTag.blog, { cascade: true })
  tags: BlogTag[];
}
