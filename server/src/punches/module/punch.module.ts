import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityModule } from "src/activities/module/activity.module";
import { UserModule } from "src/users/module/user.module";
import { PunchController } from "../controller/punch.controller";
import { Punch } from "../entity/punch.entity";
import { PunchService } from "../service/punch.service";

@Module({
  imports: [
    UserModule,    
    ActivityModule,
    TypeOrmModule.forFeature([Punch])
  ],
  providers: [PunchService],
  exports: [TypeOrmModule, PunchService],
  controllers: [PunchController],
})
export class PunchModule {}