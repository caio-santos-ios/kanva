import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Account } from './entities/account.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService){}

  async create(createAccountDto: CreateAccountDto) {
    const findUser = await this.prisma.account.findUnique({
      where: { email: createAccountDto.email }
    })

    if(findUser) throw new ConflictException("email invalited")

    const instanceUser = new Account()

    Object.assign(instanceUser, {...createAccountDto})

    const user = await this.prisma.account.create({data: {...createAccountDto}})

    return plainToInstance(Account, user);
  }

  async findAll() {
    const users = await this.prisma.account.findMany()
    return plainToInstance(Account, users);
  }

  async findOneEmail(email: string) {
    const findUser = await this.prisma.account.findUnique({
      where: { email }
    })

    if(!findUser) throw new NotFoundException("user not found")

    return findUser;
  }


  findOne(id: number, userId: number) {
    const findUser = this.prisma.account.findFirst({
      where: { id },
      include: {
        courses: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if(!findUser) throw new NotFoundException("user not found")

    if(id != userId) throw new UnauthorizedException("not autorization")

    return plainToInstance(Account, findUser);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto, userId: number) {
    const findUser = await this.prisma.account.findUnique({
      where: { id }
    })

    if(!findUser) throw new NotFoundException("user not found")

    if(id != userId) throw new UnauthorizedException("not autorization")

    const user = await this.prisma.account.update({
      where: {id},
      data: {...updateAccountDto}
    })

    return plainToInstance(Account, user);
  }

  async remove(id: number, userId: number) {
    const findUser = this.prisma.account.findUnique({
      where: { id }
    })

    if(!findUser) throw new NotFoundException("user not found")

    await this.prisma.account.delete({
      where: {id}
    })

    return;
  }
}
