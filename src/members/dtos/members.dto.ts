import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateIf } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";
import { Sex } from "./sex.enum";

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
    @IsEnum(Sex)
    @ApiProperty({ description: 'parametro de miembro', required: true, enum: Sex })
    sex: Sex;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    phone: string;

    @IsEmail({}, { message: 'Debe ingresar un correo valido!' })
    @ValidateIf((obj) => obj.email !== null && obj.email !== '')
    @ApiProperty({ description: 'parametro de miembro', required: false })
    email: string;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    district: string;

    @IsBoolean()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    volunteer: boolean;

    @IsPositive()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    municipalityId: number;

    @IsPositive()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    occupationId: number;

    @IsPositive()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    socialNetworkId: number;

    @IsPositive()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    howKnowId: number;
    
    @IsDateString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    arrivalDate: Date;

    @IsString()
    @ApiProperty({ description: 'parametro de miembro', required: true })
    comment: string;
}
