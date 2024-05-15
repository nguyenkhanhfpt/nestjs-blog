import { BlogCategories } from "src/blog-categories/entities/blog-categories.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @ManyToOne(() => User, (user) => user.categories)
    Creator?: User;

    @OneToMany(() => BlogCategories, (blogCategory) => blogCategory.category)
    blogCategories: BlogCategories[];
}
