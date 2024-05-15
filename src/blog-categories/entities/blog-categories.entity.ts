import { Blog } from "src/blogs/entities/blog.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'blog_categories'})
export class BlogCategories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'blogId'})
    blogId: number;

    @Column({name: 'categoryId'})
    categoryId: number;

    @ManyToOne(() => Blog, (blog) => blog.blogCategories, { onDelete: 'CASCADE' })
    blog: Blog;

    @ManyToOne(() => Category, (category) => category.blogCategories, { onDelete: 'CASCADE' })
    category: Blog;
}