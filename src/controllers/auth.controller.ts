import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../Injectors/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // singup  route
  @Post('/singup')
  singup() {}
  // singIn route
  @Post('/singin')
  singin() {}
}
