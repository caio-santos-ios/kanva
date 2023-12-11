import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from '../accounts/accounts.service';
import { compareSync } from 'bcryptjs';
import { sign } from 'crypto';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private accountService: AccountsService){}

  async create(createAuthDto: CreateAuthDto) {
    const findUser = await this.accountService.findOneEmail(createAuthDto.email)

    if(!findUser) throw new UnauthorizedException("Email ou senha incorretos")
    
    const validatedPassword = compareSync(createAuthDto.password, findUser.password)
    
    if(!validatedPassword) throw new UnauthorizedException("Email ou senha incorretos")
    
    return {
      token: this.jwtService.sign({ email: findUser.email }, { subject: String(findUser.id) }),
      id: findUser.id
    };
  }
}
