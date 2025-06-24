import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/users/module/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { ActivityModule } from 'src/activities/module/activity.module';

dotenv.config();

@Module({
  imports: [
    UserModule,  
    ActivityModule,  
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}