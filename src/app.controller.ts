import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { readFile, readFileSync } from 'fs';
import { join } from 'path';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('swagger')
  swagger(): any {
    const data = readFileSync(join(process.cwd(), `swagger-spec.json`), 'utf8');
    return JSON.parse(data);
  }

}
