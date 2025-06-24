import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/module/user.module";
import { ActivityController } from "../controller/activity.controller";
import { Activity } from "../entity/activity.entity";
import { ActivityService } from "../service/activity.service";

@Module({
  imports: [
    UserModule,    
    TypeOrmModule.forFeature([Activity])
  ],
  providers: [ActivityService],
  exports: [TypeOrmModule, ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}