import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('test_users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    ) {}
  @Post("dangky")
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    if(newUser[0])
    {
      //this._emailService.sendEmail(newUser[1])
      return [true, 'Đăng Ký Thành Công']; 
    }
    else {
      return newUser
    }

  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.read(id);
  }
  @Get('/get/admin')
  @UseGuards(AuthGuard('hderma'))
  findAdmin() {
    return this.usersService.findAdmin();
  }
  @Patch(':id')
  @UseGuards(AuthGuard('hderma'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Post('changepass')
  @UseGuards(AuthGuard('hderma'))
  changepass(@Body() data: any)
  {
    return this.usersService.changepass(data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('hderma'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
