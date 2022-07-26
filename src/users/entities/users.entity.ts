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
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { unique: true })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
