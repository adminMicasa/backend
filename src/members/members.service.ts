import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApi, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Injectable()
export class MembersService {
    private readonly logger = new Logger(MembersService.name);

    constructor(@InjectRepository(Member, 'default')
    private readonly membersRepository: Repository<Member>,) {
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

    async getMemberById(id: number) {
        const member = await this.membersRepository.findOneBy({ id: id });
        if (!member) {
            throw new NotFoundException('No se encuentra el miembro solicitado!');
        }
        return member;
    }

    async createMember(member: Member) {
        const created = await this.membersRepository.save(member);
        if (!created) {
            throw new BadRequestException('No se logro crear el miembro!');
        }
        return created;
    }

    async updateMember(id: number, member: Member) {
        const updated = await this.membersRepository.save({ id, ...member });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar el miembro #: ${id}`);
        }
        return updated;
    }

    async deleteMember(id: number) {
        const deleted = await this.membersRepository.delete(id);
        if (!deleted) {
            throw new BadRequestException(`No se logro eliminar el miembro #: ${id}`);
        }
        return deleted;
    }

}
