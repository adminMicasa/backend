import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";



export class CoursesQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    name?: string;
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    active?: boolean;
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    startDate?: Date;
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    endDate?: Date;
}

export class CourseParamDto {
    @ApiProperty({ description: 'id del curso', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class CourseDeleteDto {
    @ApiProperty({ description: 'id del curso', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'active param del curso', required: true })
    @IsBoolean()
    active: boolean;
}

export class CourseBodyDto {
    @IsString()
    @ApiProperty({ description: 'parametro de curso - escuela', required: true })
    name: string;

    @IsNumber()
    @ApiProperty({ description: 'parametro de curso - escuela', required: true })
    stepId: number;

    @IsBoolean()
    @ApiProperty({ description: 'parametro de curso - escuela', required: true })
    active: boolean;

    @IsDateString()
    @ApiProperty({ description: 'parametro de curso - escuela', required: true })
    startDate: Date;

    @IsDateString()
    @ApiProperty({ description: 'parametro de curso - escuela', required: true })
    endDate: Date;

}
