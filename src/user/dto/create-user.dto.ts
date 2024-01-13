import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;
}
