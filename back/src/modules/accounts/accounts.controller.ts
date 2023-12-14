import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/auth.gurd';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Patch(':token')
  validateAccount(@Param('token') token: string){
    return this.accountsService.validateAccount(token)
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  findOne(@Param('id') id: number, @Request() req) {
    return this.accountsService.findOne(id, req.user.id);
  }

  @Get()
  findOneEmail(@Body() loginAccount: CreateAuthDto) {
    return this.accountsService.findOneEmail(loginAccount.email);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  update(@Param('id') id: number, @Body() updateAccountDto: UpdateAccountDto, @Request() req) {
    return this.accountsService.update(id, updateAccountDto, req.user.id);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  remove(@Param('id') id: number, @Request() req) {
    return this.accountsService.remove(id, req.user.id);
  }
}
