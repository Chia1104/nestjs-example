import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { Repository } from 'typeorm';
import { NewPostInput } from '../DTO/new-post.input';
import { type uuid } from '../../util/types/uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async getPostById(id: uuid): Promise<Post> {
    return await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne();
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .getMany();
  }

  async createPost(newPost: NewPostInput): Promise<Post> {
    return this.postsRepository.save(newPost);
  }

  async updatePost(id: uuid, newPost: NewPostInput): Promise<Post> {
    return this.postsRepository.save({ id, ...newPost });
  }

  async deletePost(id: uuid): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
