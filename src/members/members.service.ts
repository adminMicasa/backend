import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApi, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { SelectorsService } from 'src/selectors/selectors.service';
import { MemberBodyDto } from './dtos/members.dto';

@Injectable()
export class MembersService {
    private readonly logger = new Logger(MembersService.name);

    constructor(
        @InjectRepository(Member, 'default')
        private readonly membersRepository: Repository<Member>,
        private readonly selectorsService: SelectorsService
    ) {
    }

    async getAll(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.membersRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                names: ILike(`%${filters.names || ''}%`),
                lastnames: Like(`%${filters.lastnames || ''}%`),
                phone: Like(`%${filters.phone || ''}%`),
                email: Like(`%${filters.email || ''}%`),
            },
            relations: ['municipality', 'occupation', 'socialNetwork', 'howKnow', 'discipleshipLeader']
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }

    async getMemberById(id: number) {
        const member = await this.membersRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: ['municipality', 'occupation', 'socialNetwork', 'howKnow', 'discipleshipLeader']
            },
        );
        if (!member) {
            throw new NotFoundException('No se encuentra el miembro solicitado!');
        }
        return member;
    }

    async createMember(memberBody: MemberBodyDto) {
        const member = await this.buildMember(memberBody);
        const created = await this.membersRepository.save(member);
        if (!created) {
            throw new BadRequestException('No se logro crear el miembro!');
        }
        return created;
    }

    async updateMember(id: number, memberBody: MemberBodyDto) {
        const member = await this.buildMember(memberBody);
        const updated = await this.membersRepository.save({ id, ...member });
        if (!updated) {
            throw new BadRequestException(`No se logro actualizar el miembro #: ${id}`);
        }
        return updated;
    }

    async deleteMember(id: number) {
        const deleted = await this.membersRepository.save({ id,active:false});
        if (!deleted) {
            throw new BadRequestException(`No se logro eliminar el miembro #: ${id}`);
        }
        return deleted;
    }

    async buildMember(memberBody: MemberBodyDto) {
        let municipality = null;
        let occupation = null;
        let socialNetwork = null;
        let howKnow = null;
        let discipleshipLeader = null;

        if (memberBody.municipalityId)
            municipality = await this.selectorsService.getMunicipaliyById(memberBody.municipalityId);
        if (memberBody.occupationId)
            occupation = await this.selectorsService.getOccupationById(memberBody.occupationId);
        if (memberBody.socialNetworkId)
            socialNetwork = await this.selectorsService.getSocialNetworkById(memberBody.socialNetworkId);
        if (memberBody.howKnowId)
            howKnow = await this.selectorsService.getHowKnowById(memberBody.howKnowId);
        if (memberBody.discipleshipLeaderId)
            discipleshipLeader = await this.getMemberById(memberBody.discipleshipLeaderId);

        const member = this.membersRepository.create({
            names: memberBody.names,
            lastnames: memberBody.lastnames,
            age: memberBody.age,
            sex: memberBody.sex,
            phone: memberBody.phone,
            email: memberBody.email,
            district: memberBody.district,
            volunteer: memberBody.volunteer,
            discipleship: memberBody.discipleship,
            municipality: municipality,
            occupation: occupation,
            socialNetwork: socialNetwork,
            howKnow: howKnow,
            discipleshipLeader: discipleshipLeader
        });
        return member;
    }

}
