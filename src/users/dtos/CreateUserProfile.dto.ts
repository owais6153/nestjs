import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
