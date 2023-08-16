import { Controller, Get, Query } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
    constructor(
        private readonly membersService: MembersService,
    ) { }

    @Get()
    getHello(
        @Query('page') page: string,
        @Query('perPage') perPage: string,
        @Query('names') names: string,
        @Query('lastnames') lastnames: string,
        @Query('phone') phone: string,
        @Query('email') email: string,
    ): any {
        return this.membersService.getAll({ page: page ? parseInt(page) : 1, perPage: perPage ? parseInt(perPage) : 10 }, { names, lastnames, email, phone });
    }
}
