import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
