import {
  Controller,
  Post,
  Get,
  UseGuards,
  Query,
  Request,
  Body,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
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
import { NewUserInput } from '../DTO/new-user.input';
import { CheckEmailPipe } from '../../pipes/check-email';
import { CheckPasswordPipe } from '../../pipes/check-password';

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
    @Query('email', CheckEmailPipe) email: string,
    @Query('password', CheckPasswordPipe) password: string,
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
  @UsePipes(ValidationPipe)
  async register(@Body() newUser: NewUserInput) {
    const user = await this.authService.register(newUser);
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
