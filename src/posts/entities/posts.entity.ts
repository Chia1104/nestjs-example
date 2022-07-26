import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.posts)
  user: User;
}
