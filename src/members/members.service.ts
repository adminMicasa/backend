import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from './member.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApi, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Injectable()
export class MembersService {
    private readonly logger = new Logger(MembersService.name);

    constructor(@InjectRepository(Members, 'default')
    private readonly membersRepository: Repository<Members>,) {
    }

    async getAll(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * paginator.perPage;

        const [data, total] = await this.membersRepository.findAndCount({
            skip,
            take: paginator.perPage,
            where: {
                names: ILike(`%${filters.names || ''}%`),
                lastnames: Like(`%${filters.lastnames || ''}%`),
                phone: Like(`%${filters.phone || ''}%`),
                email: Like(`%${filters.email || ''}%`),
            }
        });
        return { data, total };
    }
}
