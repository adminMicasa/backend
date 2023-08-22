import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User, 'default')
    private readonly membersRepository: Repository<User>,) { }

    getUserByEmail(email: string) {
        return this.membersRepository.findOneBy({ email: email });
    }
    
}
