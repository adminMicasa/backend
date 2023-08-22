import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    saltOrRounds = 10;

    constructor(private usersService: UsersService) { }

    async signIn(authBody: AuthBodyDto) {
        const user = await this.usersService.getUserByEmail(authBody.email);
        const compareResult = await this.comparePasswords(authBody.password, user.password);
        if (!compareResult) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
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
