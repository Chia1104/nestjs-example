import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services';
import { JwtAuthGuard } from '../../../guards';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewUserDto, UserLoginDto } from '../DTO';
import { TimeoutInterceptor } from '../../../interceptors';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async login(@Body() userLoginDto: UserLoginDto) {
    // await new Promise(r => setTimeout(r, 2000));
    const user = await this.authService.login(
      userLoginDto.email,
      userLoginDto.password,
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Register' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(ValidationPipe)
  async register(@Body() newUser: NewUserDto) {
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
  @UseInterceptors(TimeoutInterceptor)
  async profile(@Request() req) {
    return await req.user;
  }
}
