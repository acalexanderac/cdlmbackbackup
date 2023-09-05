import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

@IsString()
  @MinLength(6)
  password: string;

  constructor(data: Partial<LoginDto>) {
    Object.assign(this, data);

    // Trim the password value if it exists
    if (this.password) {
      this.password = this.password.trim();
    }
  }
}
