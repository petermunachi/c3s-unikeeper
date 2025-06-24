import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { formatResponse } from 'src/lib/helper';
import { IAPIResponse } from 'src/lib/types';
import { PunchService } from '../service/punch.service';

@ApiTags('punch')
@Controller('punch')
export class PunchController {

  constructor(
    private readonly punchService: PunchService
  ) { }

  /**
  * Punch In user.
  * @param {Body} createTaskDto - Request body object.
  * @param {Response} res - The payload.
  * @memberof AuthController
  * @returns {JSON} - A JSON success response.
  */
  @UseGuards(JwtAuthGuard)
  @Post('/user/punch-in')
  @ApiBadRequestResponse({ description: 'User with this does not exists' })
  @ApiCreatedResponse({ description: 'User punch in successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async punchInUser(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const isPunchIn = await this.punchService.punchIn(req.user.email);
    if (!isPunchIn) {
      return formatResponse(
        { message: 'User with this email does not exists' },
        res,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }

    return formatResponse(
      {
        punch: isPunchIn,
      },
      res,
      HttpStatus.CREATED,
    );

  }

  /**
  * Punch out a user.
  * @param {Body} createTaskDto - Request body object.
  * @param {Response} res - The payload.
  * @memberof AuthController
  * @returns {JSON} - A JSON success response.
  */
  @UseGuards(JwtAuthGuard)
  @Post('/user/punch-out')
  @ApiBadRequestResponse({ description: 'User punch out' })
  @ApiCreatedResponse({ description: 'User punch out successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async punchOutUser(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {

    const isPunchOut = await this.punchService.punchOut(req.user.email);
    if (!isPunchOut) {
      return formatResponse(
        { message: 'User with this email does not exists' },
        res,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }

    return formatResponse(
      {
        punch: isPunchOut,
      },
      res,
      HttpStatus.OK,
    );

  }

  /**
   * Get a user punch record.
   * @param {Request} req - Request param.
   * @param {Response} res - Response object.
   * @memberof UserController
   * @returns {JSON} - A JSON success response.
   */
  @Get('/user/punch')
  @ApiOkResponse({
    description: 'User punch info is returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async getUserPunches(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const punches = await this.punchService.getPunchByUserId(req.user.id);
    return formatResponse(punches, res, HttpStatus.OK);
  }

  /**
   * Get a user punch record.
   * @param {Request} req - Request param.
   * @param {Response} res - Response object.
   * @memberof UserController
   * @returns {JSON} - A JSON success response.
   */
  @Get('/status')
  @ApiOkResponse({
    description: 'Check if user is punched in or out',
  })
  @ApiUnauthorizedResponse({
    description: 'Empty/Invalid token',
  })
  @UseGuards(JwtAuthGuard)
  async getPunchStatus(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const status = await this.punchService.getPunchStatus(req.user.email);    
    return formatResponse({ status }, res, HttpStatus.OK);
  }

  
}
