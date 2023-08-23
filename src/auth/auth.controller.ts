import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthBodyDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) { }

    @ApiTags('auth')
    @Post()
    async signIn(
        @Body() authBody: AuthBodyDto): Promise<any> {
        return this.authService.signIn(authBody);
    }
}
