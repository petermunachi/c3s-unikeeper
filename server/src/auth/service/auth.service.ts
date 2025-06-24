import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/service/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entity/user.entity';
import { IJWT } from '../types';
import SignupDto from '../dto/signup.dto';
import LoginDto from '../dto/login.dto';
import { ActivityService } from 'src/activities/service/activity.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    
    @Inject(ActivityService)
    private readonly activityService: ActivityService,
    private jwtService: JwtService
  ) { }

  async loginUser(loginDto: LoginDto): Promise<User | null> {
    try {
      const user = await this.userService.getUserByEmail(loginDto.email);
  
      if (!user) return null;
  
      const checkPassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
  
      if (!checkPassword) return null;

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);

      await this.activityService.upsertUserActivity({ email: user.email, lastLogin: currentUnixTimestamp })
      
      return user;
      
    } catch (error) {
      console.log(error);
    }
  }

  async registerUser(signupDto: SignupDto): Promise<User | null> {
    try {
      let hashedPassword = null;
          
      // check whether email exist
      const userExists = await this.userService.getUserByEmail(signupDto.email);
  
      if (userExists) return null;
  
      if (signupDto.password) {
        hashedPassword = await AuthService.hashPassword(signupDto.password);
      }
  
      return await this.userService.createUser({
        ...signupDto,
        password: hashedPassword
      });
         
    } catch (error) {
      console.log(error);
    }

  }

  private static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  generateToken(user: IJWT): string {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  decodeToken(token: string): string | any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
  
}
