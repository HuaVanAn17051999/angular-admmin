export class PagedList<T> {
    count: number;
    pageIndex: number;
    pageSize: number;
    items: T[];
}