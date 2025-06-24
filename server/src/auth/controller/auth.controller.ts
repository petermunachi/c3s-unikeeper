import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IAPIResponse } from 'src/lib/types';
import { AuthService } from '../service/auth.service';
import { formatResponse } from 'src/lib/helper';
import LoginDto from '../dto/login.dto';
import SignupDto from '../dto/signup.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserService } from 'src/users/service/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  /**
   * Create account for a user.
   * @param {Body} createUserDto - Request body object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiCreatedResponse({ description: 'The user was created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async register(
    @Req() req,
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    // const loggedUser = await this.userService.getUserById(req.user.id);

    // if (!loggedUser.isAdmin) {
    //   return formatResponse(
    //     { message: 'Request sender is not an admin' },
    //     res,
    //     HttpStatus.UNAUTHORIZED,
    //     true,
    //   );
    // }

    const registerUser = await this.authService.registerUser(signupDto);
    if (!registerUser) {
      return formatResponse(
        { message: 'User already exists' },
        res,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }

    return formatResponse(
      {
        user: { ...registerUser, password: undefined },
      },
      res,
      HttpStatus.CREATED,
    );

  }

  /**
   * Login user.
   * @param {Body} loginDto - Request body object.
   * @param {Response} res - Response object.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  @Post('login')
  @ApiOkResponse({ description: 'The user logged in successfully' })
  @ApiNotFoundResponse({ description: 'Invalid username or password' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAPIResponse> {
    const user = await this.authService.loginUser(loginDto);
    if (!user) {
      return formatResponse(
        { message: 'Invalid username or password' },
        res,
        HttpStatus.NOT_FOUND,
        true,
      );
    }

    return formatResponse(
      {
        token: this.authService.generateToken({ id: user.id, email: user.email }),
        user: { ...user, password: undefined },
      },
      res,
      HttpStatus.OK,
    );
  }
  
}
