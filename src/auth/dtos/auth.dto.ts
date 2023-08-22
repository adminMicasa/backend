import { ApiProperty } from "@nestjs/swagger";

export class AuthBodyDto {
    @ApiProperty({ description: 'parametro de auth', required: true })
    email: string;
    @ApiProperty({ description: 'parametro de auth', required: true })
    password: string;
}