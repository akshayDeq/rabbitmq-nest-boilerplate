import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('RABBIT_SERVICE') private readonly client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.client.emit('cmd', { data: [1, 2, 3] });
    return this.appService.getHello();
  }

  @Post(':id')
  async sendSome(@Param('id') id: string) {
    this.client.emit('get-param', parseInt(id));
  }
}
