import {
  Controller,
  Post,
  Get,
  UseGuards,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services';
import { JwtAuthGuard } from '../guards';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({
    name: 'email',
    description: 'Email',
    required: true,
  })
  @ApiQuery({
    name: 'password',
    description: 'Password',
    required: true,
  })
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    const user = await this.authService.login(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Register' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiQuery({
    name: 'name',
    description: 'Name',
    required: true,
  })
  @ApiQuery({
    name: 'email',
    description: 'Email',
    required: true,
  })
  @ApiQuery({
    name: 'password',
    description: 'Password',
    required: true,
  })
  @ApiQuery({
    name: 'role',
    description: 'Role',
    required: true,
  })
  async register(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('password') password: string,
    @Query('role') role: string,
  ) {
    const user = await this.authService.register({
      name,
      email,
      password,
      role,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({ status: 200, description: 'Profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  async profile(@Request() req) {
    return await req.user;
  }
}
