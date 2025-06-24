import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { IAPIResponse } from 'src/lib/types';
import { formatResponse } from 'src/lib/helper';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a user record.
   * @param {Request} req - Request param.
   * @param {Response} res - Response object.
   * @memberof UserController
   * @returns {JSON} - A JSON success response.
   */
  @Get('/profile')
  @ApiOkResponse({
    description: 'User information is returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const user = await this.userService.getUserByEmail(req.user.email.trim());
    return formatResponse({ ...user, password: undefined }, res, HttpStatus.OK);
  }

  /**
   * Get a user record.
   * @param {Request} req - Request param.
   * @param {Response} res - Response object.
   * @memberof UserController
   * @returns {JSON} - A JSON success response.
   */
  @Get('/allUsers')
  @ApiOkResponse({
    description: 'User information is returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async getAllUsers(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const users = await this.userService.findAllUsers();
    return formatResponse(users, res, HttpStatus.OK);
  }

  /**
   * Create task for a user.
   * @param {Body} createTaskDto - Request body object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  @Post('/deactivate/:email')
  @ApiOkResponse({
    description: 'User tasks is returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async deactivateUser(
    @Param('email') email: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const createTask = await this.userService.deactivateUser(email);
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
}
