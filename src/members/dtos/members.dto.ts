import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";

export class MembersQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    names?: string;
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    lastnames?: string;
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    email?: string;
}

export class MemberParamDto  {
    @ApiProperty({ description: 'id del miembro', required: true })
    id: string;
}

export class MemberBodyDto {
    @ApiProperty({ description: 'parametro de miembro', required: true })
    names: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    lastnames: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    age: number;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    phone: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    email: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    municipality: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    district: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    occupation: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    volunteer: boolean;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    socialNetwork: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    howFindUs: string;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    discipleship: boolean;
    @ApiProperty({ description: 'parametro de miembro', required: true })
    leaderDiscipleship: string;
}
