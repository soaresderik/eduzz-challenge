import { IsString, Length, IsEmail } from "class-validator";

export class RegisterDTO {
  @IsString()
  @Length(2, 140)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
