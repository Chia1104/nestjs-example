import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
