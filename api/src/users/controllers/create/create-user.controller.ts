import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { API_PATH } from '../constants.controller';
import { CreateUserService } from 'src/users/services/create/create.service';
import { CreateUserResponseDto } from 'src/users/dto/create-user-response.dto';

@Controller(API_PATH)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.createUserService.create(createUserDto);
  }
}
