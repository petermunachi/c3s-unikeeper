import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/service/user.service';
import { Repository } from 'typeorm';
import CreateActivityDto from '../dto/createActivity.dto';
import CreateTaskDto from '../dto/createActivity.dto';
import { Activity } from '../entity/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) { }
  
  async getActivityByUserId(id: string): Promise<Activity> {
    return await this.activitiesRepository.findOne(id);
  }

  async getActivityByUserEmail(email: string): Promise<Activity> {
    return await this.activitiesRepository.findOne({ email });
  }

  async upsertUserActivity(createActivityDto: CreateActivityDto): Promise<Activity | null> {  
    const userExists = await this.userService.getUserByEmail(createActivityDto.email);
          
    
    if (!userExists) return null;
    
    const activity = await this.getActivityByUserEmail(createActivityDto.email);

    if (activity) {
      return this.activitiesRepository.save({ ...activity, ...createActivityDto });
    }

    return this.activitiesRepository.save(createActivityDto);
  }

  async findAllActivities(): Promise<Activity[]> {
    return await this.activitiesRepository.find();
  }

  async getActivityById(id: string): Promise<Activity> {
    return await this.activitiesRepository.findOne(id);
  }

  async deleteActivityById(id: string): Promise<void> {
    await this.activitiesRepository.delete(id);
  }

}
