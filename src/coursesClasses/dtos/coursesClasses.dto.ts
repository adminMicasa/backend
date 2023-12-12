import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";



export class CoursesClassesQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'filtro por el Id de la escuela ', required: false })
    classDate?: Date;
}

export class CoursesClassesParamDto {
    @ApiProperty({ description: 'id de la clase', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class CourseClassByCourseParamDto {
    @ApiProperty({ description: 'id de la clase', required: true })
    @IsInt()
    @Type(() => Number)
    courseId: number;
}

export class CoursesClassesDeleteDto {
    @ApiProperty({ description: 'id de la clase', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class CoursesClassesBodyDto {
    
    @IsNumber()
    @ApiProperty({ description: 'parametro de la creación de la clase', required: true })
    numberClass: number;

    @IsDateString()
    @ApiProperty({ description: 'parametro de la creación de la clase', required: true })
    classDate: Date;

    @IsNumber()
    @ApiProperty({ description: 'parametro de la creación de la clase', required: true })
    topicId: number;

    @IsNumber()
    @ApiProperty({ description: 'parametro de la creación de la clase', required: true })
    courseId: number;
}
