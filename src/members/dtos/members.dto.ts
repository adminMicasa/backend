import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
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

export class MemberParamDto {
    @ApiProperty({ description: 'id del miembro', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class MemberBodyDto {
    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    names: string;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    lastnames: string;

    @IsNumber()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    age: number;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    phone: string;

    @IsEmail()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    email: string;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    municipality: string;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    district: string;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    occupation: string;

    @IsBoolean()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    volunteer: boolean;
}
