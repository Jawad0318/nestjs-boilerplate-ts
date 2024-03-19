import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class login {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  password: string;
}
export class changePassword {
  @IsString()
  confirmPassword: string;
  @IsString()
  newPassword: string;
  @IsString()
  oldPassword: string;
}
