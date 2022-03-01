import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('cmd')
  async handleMessagePrinted(data: number[]) {
    console.log(data);
  }

  @MessagePattern('get-param')
  async getSome(data: number) {
    console.log(data);
  }
}
