import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET } from '../../util/constants';
import { UsersModule } from '../users';
import { HashModule } from '../hash';
import { JwtStrategy } from './strategies/jwt';
import { LocalStrategy } from './strategies/local';
import { AuthController } from './controllers';

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
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
