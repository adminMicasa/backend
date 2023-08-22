import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }


    async signIn(authBody: AuthBodyDto) {
        const user = await this.usersService.getUserByEmail(authBody.email);
        const hashPassword = await this.hashPassword(authBody.password);

        if (!this.comparePasswords(authBody.password, hashPassword)) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(inputPassword: string, storedHash: string): Promise<boolean> {
        const match = await bcrypt.compare(inputPassword, storedHash);
        return match;
    }
}
