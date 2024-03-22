import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { CreateUser } from './user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService,
    private fileServie: FileService,
  ) {}

  /**
   * creating or singup
   * @param body
   * @returns
   */
  @Post('/create')
  @UseInterceptors(FileInterceptor('photo'))
  async createUser(
    @Body() body: CreateUser,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    photo: Express.Multer.File | undefined,
  ): Promise<{ user: User; token: string }> {
    const photoPath = await this.fileServie.saveFile(photo);
    return await this.userService.create(body, photoPath);
  }
  /**
   * getting all the user
   * @returns
   */
  @UseGuards(AuthGuard)
  @Get('/getAll')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  /**
   *getting single user by id
   * @param userId
   * @returns
   */
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Put('/update/:userId')
  @UseInterceptors(FileInterceptor('photo'))
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: CreateUser,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'png' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    photo: Express.Multer.File | undefined,
  ): Promise<User> {
    const photoPath = await this.fileServie.saveFile(photo);
    return await this.userService.updateUser(userId, body, photoPath);
  }
  /**
   * deleting user
   * @param userId
   * @returns
   */
  @UseGuards(AuthGuard)
  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.deleteUser(userId);
  }
}
