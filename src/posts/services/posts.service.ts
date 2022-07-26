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
    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async createPost(newPost: NewPostInput): Promise<Post> {
    return this.postsRepository.save(newPost);
  }
}
