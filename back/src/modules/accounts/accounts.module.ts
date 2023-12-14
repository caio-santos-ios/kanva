import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailServiice } from 'src/utils/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user:  process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      defaults: {
        from: process.env.SMTP_USER
      }
    })
  ],
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, MailServiice],
  exports: [AccountsService]
})
export class AccountsModule {}
