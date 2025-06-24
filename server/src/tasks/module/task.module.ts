import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/module/user.module";
import { TaskController } from "../controller/task.controller";
import { Task } from "../entity/task.entity";
import { TaskService } from "../service/task.service";

@Module({
  imports: [
    UserModule,    
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TaskService],
  exports: [TypeOrmModule, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}