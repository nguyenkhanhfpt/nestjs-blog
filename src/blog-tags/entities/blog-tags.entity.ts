import { Blog } from 'src/blogs/entities/blog.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blog_tags' })
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Blog, (blog) => blog.tags, {
    onDelete: 'CASCADE',
  })
  blog: Blog;
}
