export class PaginationApi {
    page?: number | any = 1;
    perPage?: number | any = 10;

    constructor(page: number | any, perPage: number | any) {
        page = this.page ? (typeof this.page == 'string' ? parseInt(this.page) : this.page) : 1;
        perPage = this.page ? (typeof this.page == 'string' ? parseInt(this.page) : this.page) : 10;
    }
}

export class FiltersApi {
    name?: string = '';
    names?: string = '';
    lastnames?: string = '';
    phone?: string = '';
    email?: string = '';
}