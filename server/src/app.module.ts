import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entity/user.entity';
import { UserModule } from './users/module/user.module';
import { AuthModule } from './auth/module/auth.module';
import { ActivityModule } from './activities/module/activity.module';
import { Activity } from './activities/entity/activity.entity';
import { TaskModule } from './tasks/module/task.module';
import { Task } from './tasks/entity/task.entity';
import { Punch } from './punches/entity/punch.entity';
import { PunchModule } from './punches/module/punch.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as unknown as any,
      url: process.env.DATABASE_URL,
      entities: [User, Activity, Task, Punch],
      synchronize: true,
    }),
    AuthModule,
    ActivityModule,
    TaskModule,
    PunchModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
