import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    saltOrRounds = 10;

    constructor(private usersService: UsersService, private readonly jwtService: JwtService) { }

    async signIn(authBody: AuthBodyDto) {
        const user = await this.usersService.getUserByEmail(authBody.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const compareResult = await this.comparePasswords(authBody.password, user.password);
        if (!compareResult) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const accessToken = this.jwtService.sign(result);
        return {accessToken};
    }
    
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltOrRounds);
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(inputPassword: string, storedHash: string): Promise<boolean> {
        const match = await bcrypt.compare(inputPassword, storedHash);
        return match;
    }
}
