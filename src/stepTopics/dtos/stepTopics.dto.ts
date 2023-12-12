import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";


export class StepTopicsQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'filtro por el nombre del tema ', required: false })
    topicName?: string;
}

export class StepTopicsParamDto {
    @ApiProperty({ description: 'id del tema', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class StepTopicsByStepParamDto {
    @ApiProperty({ description: 'id de la Paso o escuela a la que pertenecen los temas', required: true })
    @IsInt()
    @Type(() => Number)
    stepId: number;
}

export class StepTopicsDeleteDto {
    @ApiProperty({ description: 'id de la tema', required: true })
    @IsInt()
    @Type(() => Number)
    id: number;
}

export class StepTopicsBodyDto {

    @IsString()
    @ApiProperty({ description: 'parametro de la creación del tema', required: true })
    topicName: string;

    @IsNumber()
    @ApiProperty({ description: 'parametro de la creación del tema', required: true })
    stepId: number;

}
