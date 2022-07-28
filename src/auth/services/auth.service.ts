import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services';
import { HashService } from '../../hash/services';
import { NewUserInput } from '../DTO/new-user.input';
import { z } from 'zod';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  private async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await this.hashService.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (user) {
      const { password, ...result } = user;
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      return {
        ...result,
        accessToken: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async register(newUser: NewUserInput): Promise<any> {
    const checkUser = await this.usersService.getUserByEmail(newUser.email);
    if (checkUser) {
      return null;
    }
    const pass = await this.hashService.hash(newUser.password);
    const newUserData = { ...newUser, password: pass };
    const user = await this.usersService.createUser(newUserData);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return {
      ...result,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
