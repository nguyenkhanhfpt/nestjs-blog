import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'blogs'})
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'title'})
    title: string;

    @Column({name: 'slug'})
    slug: string;

    @Column({name: 'content', type: 'text'})
    content: string;

    @ManyToOne(() => User, (user) => user.blogs)
    user: User
}
