import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginatorQueryParamDto } from "src/shared/dtos/paginator-query-params.dto";

export class SelectorsQueryParamDto extends PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'parametro filtros', required: false })
    name?: string;
}