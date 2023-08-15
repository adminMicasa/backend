import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './user';
@Injectable()
export class AppService {

  constructor(@InjectRepository(Member)
  private readonly userRepository: Repository<Member>,) {

  }
  async getHello(): Promise<any> {
    return await this.userRepository.find();
    return 'Hello World!';
  }
}
