import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { miembros } from './user.entity';
@Injectable()
export class AppService {

  constructor(@InjectRepository(miembros)
  private readonly userRepository: Repository<miembros>,) {

  }
  async getHello(): Promise<any> {
    return await this.userRepository.find();
    return 'Hello World!';
  }
}
