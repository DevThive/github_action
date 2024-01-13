import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('me')
  findUserById(@UserId() id: string) {
    return this.userService.findUserById(+id);
  }
}
