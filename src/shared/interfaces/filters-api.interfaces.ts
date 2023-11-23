export class PaginationApi {
    page?: number | any = 1;
    perPage?: number | any = 10;

    constructor(page: number | any, perPage: number | any) {
        this.page = page ? (typeof page == 'string' ? parseInt(page) : page) : 1;
        this.perPage = perPage ? (typeof perPage == 'string' ? parseInt(perPage) : perPage) : 10;
    }
}

export class FiltersApi {
    name?: string = '';
    names?: string = '';
    lastnames?: string = '';
    phone?: string = '';
    email?: string = '';
}

export class FiltersApiCourses {
    name?: string = '';
    active?: boolean = true;
    startDate?: Date = new Date();
    endDate?: Date = new Date();
}

export class FiltersApiEnrollmentCourses {
    state?: string = '';
    //member?: number = 0;
}