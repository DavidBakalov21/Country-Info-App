import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';
import { plainToInstance } from 'class-transformer';
import { AddHolidayDTO } from './dto/add-holiday.dto';
import { AddHolidayResultDTO } from './dto/add-holiday-result.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<ReturnUserDTO> {
    const user = await this.userService.createUser(createUserDto);

    return plainToInstance(ReturnUserDTO, user);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ReturnUserDTO> {
    const user = await this.userService.getUserById(id);
    return plainToInstance(ReturnUserDTO, user);
  }
  @Post(':userId/calendar/holidays')
  async AddHolidaysToCalendar(
    @Param('userId') userId: number,
    @Body() data: AddHolidayDTO,
  ): Promise<AddHolidayResultDTO> {
    const result = await this.userService.addHolidaysToCalendar(userId, data);
    return plainToInstance(AddHolidayResultDTO, result);
  }
}
