import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";



export class EnrollmentCoursesQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'filtro estado del curso', required: false })
    state?: string;
}

export class EnrollmentCourseParamDto {
    @ApiProperty({ description: 'id del curso', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class EnrollmentByCourseParamDto {
    @ApiProperty({ description: 'id del curso', required: true })
    @IsInt()
    @Type(() => Number)
    courseId: number;
}

export class EnrollmentCourseDeleteDto {
    @ApiProperty({ description: 'id del curso', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'active param del curso', required: true })
    @IsString()
    state: string;
}

export class EnrollmentCourseBodyDto {
    @IsString()
    @ApiProperty({ description: 'parametro de la inscripcion del curso - escuela', required: true })
    state: string;

    @IsNumber()
    @ApiProperty({ description: 'parametro de la inscripcion del curso - escuela', required: true })
    memberId: number;

    @IsNumber()
    @ApiProperty({ description: 'parametro de la inscripcion del curso - escuela', required: true })
    courseId: number;
}
