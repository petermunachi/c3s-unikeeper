import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityService } from 'src/activities/service/activity.service';
import { UserService } from 'src/users/service/user.service';
import { Repository } from 'typeorm';
import { Punch } from '../entity/punch.entity';

@Injectable()
export class PunchService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(ActivityService)
    private readonly activityService: ActivityService,

    @InjectRepository(Punch)
    private punchesRepository: Repository<Punch>,
  ) {}

  async getPunchByUserId(id: string): Promise<Punch[]> {
    return await this.punchesRepository.find({
      where: { user: { id } },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getPunchStatus(email: string): Promise<boolean | null> {
    const activity = await this.activityService.getActivityByUserEmail(email)
    if (activity.lastPunchId !== null) {
      const getPunch = await this.punchesRepository.findOne({ id: activity.lastPunchId })      
      if (getPunch.workTo === null) {
        return false;
      } else {
        return true
      }
    }
    return true
  }

  async punchIn(userEmail: string): Promise<Punch | null> {
    const userExists = await this.userService.getUserByEmail(userEmail);

    if (!userExists) return null;
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);
    const punch = { workFrom: currentUnixTimestamp, user: userExists }

    const lastPunchData = await this.punchesRepository.save(punch);
    
    await this.activityService.upsertUserActivity({ email: userExists.email, lastPunchId: lastPunchData.id })

    return lastPunchData
  }

  async punchOut(userEmail: string): Promise<Punch | null> {  
    const userExists = await this.userService.getUserByEmail(userEmail);
            
    if (!userExists) return null;

    const activity = await this.activityService.getActivityByUserEmail(userExists.email)

    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    return this.punchesRepository.save({ id: activity.lastPunchId, workTo: currentUnixTimestamp })
  }

  async findAllPunches(): Promise<Punch[]> {
    return await this.punchesRepository.find();
  }

  async getPunchById(id: string): Promise<Punch> {
    return await this.punchesRepository.findOne(id);
  }

  async deletePunchById(id: string): Promise<void> {
    await this.punchesRepository.delete(id);
  }

}
