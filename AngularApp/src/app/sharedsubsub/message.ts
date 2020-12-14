import { SubsubAdmin } from './subsub-admin.model';

export class Message {
    subsubAdmins: SubsubAdmin[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}