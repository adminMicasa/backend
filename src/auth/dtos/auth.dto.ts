import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AuthBodyDto {
    @IsEmail()
    @ApiProperty({ description: 'parametro de auth', required: true })
    email: string;

    @IsString()
    @ApiProperty({ description: 'parametro de auth', required: true })
    password: string;
}