import {
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Body,
  Request,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from '../services';
import { JwtAuthGuard } from '../../auth/guards';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { type uuid, uuidSchema } from '../../util/types/uuid';
import { NewPostInput } from '../DTO/new-post.input';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Get all posts' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'NotFound' })
  async getAllPosts() {
    const posts = await this.postsService.getAllPosts();
    if (!posts || posts.length === 0) throw new NotFoundException();
    return posts;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, description: 'Get post by id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'NotFound' })
  @ApiParam({ name: 'id', description: 'Post id' })
  async getPostById(@Param('id') id: uuid) {
    if (!uuidSchema.safeParse(id).success) throw new NotFoundException();
    const post = await this.postsService.getPostById(id);
    if (!post) throw new NotFoundException();
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, description: 'Create post' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async createPost(@Body() newPost: NewPostInput, @Request() req) {
    const user = await req.user;
    const _newPost = { ...newPost, user };
    return await this.postsService.createPost(_newPost);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, description: 'Update post' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id', description: 'Post id' })
  @ApiBearerAuth()
  async updatePost(
    @Param('id') id: uuid,
    @Body() newPost: NewPostInput,
    @Request() req,
  ) {
    if (!uuidSchema.safeParse(id).success) throw new NotFoundException();
    const user = await req.user;
    const _newPost = { ...newPost, user };
    return await this.postsService.updatePost(id, _newPost);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, description: 'Delete post' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id', description: 'Post id' })
  @ApiBearerAuth()
  async deletePost(@Param('id') id: uuid) {
    if (!uuidSchema.safeParse(id).success) throw new NotFoundException();
    return await this.postsService.deletePost(id);
  }
}
