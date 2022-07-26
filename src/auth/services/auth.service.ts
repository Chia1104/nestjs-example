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

  private async checkLogin(email: string, password: string): Promise<boolean> {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(20),
    });
    return loginSchema.safeParse({ email, password }).success;
  }

  private async checkRegister(newUser: NewUserInput): Promise<boolean> {
    const registerSchema = z.object({
      name: z.string().min(3).max(20),
      email: z.string().email(),
      role: z.enum(['user', 'admin']),
      password: z.string().min(6).max(20),
    });
    return registerSchema.safeParse(newUser).success;
  }

  async login(email: string, password: string): Promise<any> {
    if (!(await this.checkLogin(email, password))) {
      return null;
    }
    const user = await this.validateUser(email, password);
    if (user) {
      const { password, ...result } = user;
      const payload = { id: user.id, name: user.name, email: user.email };
      return {
        ...result,
        accessToken: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async register(newUser: NewUserInput): Promise<any> {
    if (!(await this.checkRegister(newUser))) {
      return null;
    }
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
    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      ...result,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
