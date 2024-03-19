import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { CreateUser } from './user-dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * creating or singup
   * @param body
   * @returns
   */
  @Post('/create')
  async createUser(
    @Body() body: CreateUser,
  ): Promise<{ user: User; token: string }> {
    return await this.userService.create(body);
  }
  /**
   * getting all the user
   * @returns
   */
  @Get('/getAll')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  /**
   *getting single user by id
   * @param userId
   * @returns
   */
  @Get('/byId/:userId')
  async byId(@Param('userId') userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }
  /**
   * updating user
   * @param userId
   * @param body
   * @returns
   */
  @Put('/update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: CreateUser,
  ): Promise<User> {
    return await this.userService.updateUser(userId, body);
  }
  /**
   * deleting user
   * @param userId
   * @returns
   */
  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.deleteUser(userId);
  }
}
