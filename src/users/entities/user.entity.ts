import { Blog } from "src/blogs/entities/blog.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'email', unique: true})
    email: string;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'bio', nullable: true})
    bio: string;

    @Column({name: 'password', type: 'text'})
    password: string;

    @Column({name: 'refresh_token', nullable: true})
    refreshToken: string;

    @OneToMany(() => Blog, (blog) => blog.user)
    blogs: Blog[];

    @OneToMany(() => Category, (category) => category.creator)
    categories: Category[];
}
