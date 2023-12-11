import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('login')
  @HttpCode(200)
  @Post()
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
