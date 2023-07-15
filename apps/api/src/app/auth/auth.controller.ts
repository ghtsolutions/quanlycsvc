import { Controller, Get, Post,Request, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { User } from '@tazagroup/shared/datatype';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './entities/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller('test_auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService
    ) {}
  @Post('login')
  async login(@Body() user: User) {
    return await this.authService.login(user);
  }
  @Post('changepass')
  async changepass(@Body() dulieu: any) {
    return await this.authService.changepass(dulieu);
  }
  @Post('randompass')
  async randompass(@Body() dulieu: any) {
    return await this.authService.randompass(dulieu);
  }
  @Get('profile')
  @UseGuards(AuthGuard('hderma'))
  async getProfile(@Request() req) {
    const user = await this.usersService.findbySDT(req.user);
    if(user)
    {     
      delete user.password;
      return user;
    }
    else return false;
  }
}
