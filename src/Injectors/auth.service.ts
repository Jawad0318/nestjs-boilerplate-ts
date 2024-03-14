import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    console.log('sing in successfully');
  }
  singup() {}
}
