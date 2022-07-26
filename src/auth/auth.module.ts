import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from '../util/constants';
import { UsersModule } from '../users/users.module';
import { HashModule } from '../hash/hash.module';
import { JwtStrategy } from './strategies';
import { AuthController } from './controllers';
import { JwtAuthGuard } from './guards';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    HashModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
