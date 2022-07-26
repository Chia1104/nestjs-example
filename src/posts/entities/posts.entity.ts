import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities';
import { type uuid } from '../../util/types/uuid';

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
  user: User;
}
