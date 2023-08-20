import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberBodyDto, MemberParamDto, MembersQueryParamDto } from './dtos/members.dto';
import { Member } from './member.entity';
import { ApiTags } from '@nestjs/swagger';

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
        return this.membersService.getAll({ page: queryParams.page ? parseInt(queryParams.page) : 1, perPage: queryParams.perPage ? parseInt(queryParams.perPage) : 10 }, queryParams);
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
        return this.membersService.createMember(memberBody as Member);
    }

    @ApiTags('members')
    @Put(':id')
    updateMember(
        @Param() memberParam: MemberParamDto,
        @Body() memberBody: MemberBodyDto,
    ) {
        return this.membersService.updateMember(memberParam.id, memberBody as Member);
    }

    @ApiTags('members')
    @Delete(':id')
    deleteMember(
        @Param() memberParam: MemberParamDto,
    ) {
        return this.membersService.deleteMember(memberParam.id);
    }

}
