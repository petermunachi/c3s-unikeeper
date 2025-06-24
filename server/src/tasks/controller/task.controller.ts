import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { formatResponse } from 'src/lib/helper';
import { IAPIResponse } from 'src/lib/types';
import CreateTaskDto from '../dto/createTask.dto';
import { TaskService } from '../service/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {

  constructor(
    private readonly taskService: TaskService
  ) { }

  /**
  * Create task for a user.
  * @param {Body} createTaskDto - Request body object.
  * @param {Response} res - The payload.
  * @memberof AuthController
  * @returns {JSON} - A JSON success response.
  */
  @UseGuards(JwtAuthGuard)
  @Post('/create-task')
  @ApiBadRequestResponse({ description: 'User with this does not exists' })
  @ApiCreatedResponse({ description: 'Task was created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {   
    const createTask = await this.taskService.createTask(createTaskDto, req.user.email);
    if (!createTask) {
      return formatResponse(
        { message: 'User with this does not exists' },
        res,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }

    return formatResponse(
      {
        task: createTask,
      },
      res,
      HttpStatus.CREATED,
    );

  }

  /**
   * Get a user record.
   * @param {Request} req - Request param.
   * @param {Response} res - Response object.
   * @memberof UserController
   * @returns {JSON} - A JSON success response.
   */
  @Get('/user/:email')
  @ApiOkResponse({
    description: 'User tasks is returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async getUserTasks(
    @Param('email') email: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const tasks = await this.taskService.getTaskByUserEmail(email.trim());
    return formatResponse(tasks, res, HttpStatus.OK);
  }

  
}
