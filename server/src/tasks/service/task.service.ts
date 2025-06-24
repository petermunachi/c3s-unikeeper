import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/service/user.service';
import { Repository } from 'typeorm';
import CreateTaskDto from '../dto/createTask.dto';
import { Task } from '../entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTaskByUserId(id: string): Promise<Task> {
    return await this.tasksRepository.findOne({ user: { id } });
  }

  async getTaskByUserEmail(email: string): Promise<Task[]> {
    const userExists = await this.userService.getUserByEmail(email);

    return await this.tasksRepository.find({ user: { id: userExists.id } });
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userEmail: string,
  ): Promise<Task | null> {
    const userExists = await this.userService.getUserByEmail(userEmail);

    if (!userExists) return null;

    const task = { ...createTaskDto, user: userExists, email: userEmail };

    return this.tasksRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.tasksRepository.findOne(id);
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
