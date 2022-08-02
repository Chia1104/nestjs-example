import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../guards';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from '../services';
import { TimeoutInterceptor } from '../../../interceptors';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Get all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'NotFound' })
  @UseInterceptors(TimeoutInterceptor)
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    if (!users || users.length === 0) throw new NotFoundException();
    return users;
  }
}
