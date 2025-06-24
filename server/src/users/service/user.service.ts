import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SignupDto from 'src/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneOrFail({ email });
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    return this.usersRepository.save(signupDto);
  }

  async deactivateUser(email: string) {
    return await this.usersRepository.update({ email }, { isActive: false });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find({ isActive: true });
  }

  async getUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
