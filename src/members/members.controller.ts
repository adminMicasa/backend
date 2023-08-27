import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberBodyDto, MemberParamDto, MembersQueryParamDto } from './dtos/members.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('members')
export class MembersController {
    constructor(
        private readonly membersService: MembersService,
    ) { }

    @ApiTags('members')
    @Get()
    getMembers(
        @Query() queryParams: MembersQueryParamDto,
    ) {
        return this.membersService.getAll(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('members')
    @Get(':id')
    getMemberById(
        @Param() memberParam: MemberParamDto,
    ) {
        const { id } = memberParam
        return this.membersService.getMemberById(id);
    }

    @ApiTags('members')
    @Post()
    createMember(
        @Body() memberBody: MemberBodyDto,
    ) {
        return this.membersService.createMember(memberBody);
    }

    @ApiTags('members')
    @Put(':id')
    updateMember(
        @Param() memberParam: MemberParamDto,
        @Body() memberBody: MemberBodyDto,
    ) {
        return this.membersService.updateMember(+memberParam.id, memberBody);
    }

    @ApiTags('members')
    @Delete(':id')
    deleteMember(
        @Param() memberParam: MemberParamDto,
    ) {
        return this.membersService.deleteMember(+memberParam.id);
    }

}
