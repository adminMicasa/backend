import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { ILike, Like, Repository } from 'typeorm';
import { FiltersApi, PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';
import { Occupation } from './entities/occupation.entity';
import { SocialNetwork } from './entities/social-network.entity';
import { HowKnow } from './entities/how-know.entity';

@Injectable()
export class SelectorsService {
    private readonly logger = new Logger(SelectorsService.name);

    constructor(
        @InjectRepository(Municipality, 'default')
        private readonly municipalityRepository: Repository<Municipality>,
        @InjectRepository(Occupation, 'default')
        private readonly occupationRepository: Repository<Occupation>,
        @InjectRepository(SocialNetwork, 'default')
        private readonly socialNetworkRepository: Repository<SocialNetwork>,
        @InjectRepository(HowKnow, 'default')
        private readonly howKnowRepository: Repository<HowKnow>,
    ) {
    }

    async getMunicipalities(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.municipalityRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                name: ILike(`%${filters.name || ''}%`)
            },
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }
    async getMunicipaliyById(id: number) {
        const municipality = await this.municipalityRepository.findOneBy({ id: id });
        if (!municipality) {
            throw new NotFoundException('No se encuentra municipio solicitado!');
        }
        return municipality;
    }

    async getOccupations(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.occupationRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                name: ILike(`%${filters.name || ''}%`)
            },
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }
    async getOccupationById(id: number) {
        const occupation = await this.occupationRepository.findOneBy({ id: id });
        if (!occupation) {
            throw new NotFoundException('No se encuentra ocupacion solicitado!');
        }
        return occupation;
    }

    async getSocialNetworks(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.socialNetworkRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                name: ILike(`%${filters.name || ''}%`)
            },
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }
    async getSocialNetworkById(id: number) {
        const socialNetwork = await this.socialNetworkRepository.findOneBy({ id: id });
        if (!socialNetwork) {
            throw new NotFoundException('No se encuentra red social solicitado!');
        }
        return socialNetwork;
    }

    async getHowKnow(paginator: PaginationApi, filters: FiltersApi) {
        const skip = (paginator.page - 1) * (paginator.perPage == -1 ? 0 : paginator.perPage);

        const [data, total] = await this.howKnowRepository.findAndCount({
            skip,
            take: paginator.perPage == -1 ? 0 : paginator.perPage,
            where: {
                name: ILike(`%${filters.name || ''}%`)
            },
        });
        return { data, metadata: { total, perPage: paginator.perPage, page: paginator.page } };
    }
    async getHowKnowById(id: number) {
        const howKnowRepository = await this.howKnowRepository.findOneBy({ id: id });
        if (!howKnowRepository) {
            throw new NotFoundException('No se encuentra como nos conociste solicitado!');
        }
        return howKnowRepository;
    }

}
