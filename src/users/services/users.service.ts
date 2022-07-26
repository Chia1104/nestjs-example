import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { NewUserInput } from '../DTO/new-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async createUser(newUser: NewUserInput): Promise<User> {
    return this.usersRepository.save(newUser);
  }
}
