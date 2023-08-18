import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PaginatorQueryParamDto {
    @IsOptional()
    @ApiProperty({ description: 'parametro para paginacion', required: false, default: 1 })
    page?: string;
    @IsOptional()
    @ApiProperty({ description: 'parametro para paginacion', required: false, default: 10 })
    perPage?: string;
}