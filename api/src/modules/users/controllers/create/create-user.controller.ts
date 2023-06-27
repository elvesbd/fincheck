import { Controller, Post, Body } from '@nestjs/common';
import { API_PATH } from '../constants.controller';
import { CreateUserResponseDto } from '../../dto/create-user-response.dto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateUserService } from '../../services/create/create.service';

@Controller(API_PATH)
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.createUserService.create(createUserDto);
  }
}
