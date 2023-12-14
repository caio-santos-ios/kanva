import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendMailDto } from "./send-mail.dto";
import * as Mailgen from "mailgen"

var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        // Appears in header & footer of e-mails
        name: 'Kanva',
        link: 'http://localhost:3000/courses'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
})

@Injectable()
export class MailServiice{
    constructor(private readonly mailService: MailerService){}

    async sendEmail({to, subject, text}: SendMailDto){
        await this.mailService.sendMail({
            to, 
            subject,
            html: text 
        })
        .then(() => console.log("Email enviado com sucesso"))
        .catch((err) => console.log(err))

    }

    templateConfirmationAccount(accountEmail: string, accountName: string, accountToken: string){
        const email = {
            body: {
                name: accountName,
                action: {
                    instructions: 'Clique no botão abaixo para confirmar sua conta:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirmar conta',
                        link: `http://localhost:3001/accountConfirmation/${accountToken}`
                    }
                },
                outro: 'Necessita de ajuda ou tem dúvidas? Basta responder a este e-mail. Teremos todo o gosto em ajudar. Sinceramente, Kanva'
            }
        }

        const emailBody = mailGenerator.generate(email)
        const emailTemplate = {
            to: accountEmail,
            subject: "Confirmação de conta",
            text: emailBody
        }

        return emailTemplate
    }
}
