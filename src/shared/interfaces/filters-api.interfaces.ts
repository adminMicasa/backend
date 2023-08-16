export class PaginationApi {
    page?: number = 1;
    perPage?: number = 10;
}

export class FiltersApi {
    names?: string = '';
    lastnames?: string = '';
    phone?: string = '';
    email?: string = '';
}