import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;
  
@IsString()
  @MinLength(6)
  password: string;

  constructor(data: Partial<RegisterDto>) {
    Object.assign(this, data);

    // Trim the password value if it exists
    if (this.password) {
      this.password = this.password.trim();
    }
  }

 
  
}