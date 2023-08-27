import { Controller, Get, Query } from '@nestjs/common';
import { SelectorsService } from './selectors.service';
import { ApiTags } from '@nestjs/swagger';
import { SelectorsQueryParamDto } from './dtos/selectors.dto';
import { PaginationApi } from 'src/shared/interfaces/filters-api.interfaces';

@Controller('selectors')
export class SelectorsController {

    constructor(
        private selectorsService: SelectorsService) { }

    @ApiTags('selectors')
    @Get('municipalities')
    getMunicipalities(
        @Query() queryParams: SelectorsQueryParamDto,
    ) {
        return this.selectorsService.getMunicipalities(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('selectors')
    @Get('occupations')
    getOccupations(
        @Query() queryParams: SelectorsQueryParamDto,
    ) {
        return this.selectorsService.getOccupations(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('selectors')
    @Get('social-networks')
    getSocialNetworks(
        @Query() queryParams: SelectorsQueryParamDto,
    ) {
        return this.selectorsService.getSocialNetworks(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

    @ApiTags('selectors')
    @Get('how-know')
    getHowKnow(
        @Query() queryParams: SelectorsQueryParamDto,
    ) {
        return this.selectorsService.getHowKnow(
            new PaginationApi(queryParams.page, queryParams.perPage),
            queryParams);
    }

}
