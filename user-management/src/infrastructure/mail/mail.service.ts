import { Injectable, Logger } from '@nestjs/common';
import { IMailData } from './interfaces/mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  protected readonly logger = new Logger(MailService.name);

  constructor(private mailService: MailerService) {}

  async send(data: IMailData): Promise<any> {
    try {
      await this.mailService.sendMail({
        to: data.to,
        from: data.from,
        subject: data.subject,
        html: data.html,
      });
    } catch (e) {
      this.logger.error(`Failed To Sending Email , error: ${e.message}`);
    }
  }
}
