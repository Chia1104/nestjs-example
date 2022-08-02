import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities';
import { Repository } from 'typeorm';
import { NewPostDto, UpdatePostDto } from '../DTO';
import { type uuid } from '../../../util/types/uuid';

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

  async createPost(newPost: NewPostDto): Promise<Post> {
    return this.postsRepository.save(newPost);
  }

  async updatePost(id: uuid, newPost: UpdatePostDto): Promise<void> {
    await this.postsRepository
      .createQueryBuilder('post')
      .update(Post)
      .set({ ...newPost })
      .where('id = :id', { id })
      .execute();
  }

  async deletePost(id: uuid): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
