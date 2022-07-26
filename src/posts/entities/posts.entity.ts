import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities';
import { type uuid } from '../../util/types/uuid';
import { type UserCreatePost } from '../../util/types/user-create-post';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: uuid;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: UserCreatePost;
}
