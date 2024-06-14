/**
 * handling the request and response for auth
 * @author jawad altaf
 */
import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { login } from 'src/admin/admin-dto';
import { User } from 'src/models/user.model';
import { changePassword } from './auth-dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singin')
  async singin(@Body() body: login): Promise<{ user: User; token: string }> {
    return this.authService.login(body);
  }

  @Post('/changePasword/:userId')
  async changePassword(
    @Body() body: changePassword,
    @Param('userId') userId: string,
  ): Promise<User> {
    return this.authService.changePassword(userId, body);
  }

  @Post('/forgot')
  async forgot(@Body() email: string): Promise<{ message: string }> {
    return this.authService.forgotPassword(email);
  }
}
