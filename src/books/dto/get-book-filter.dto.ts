import { Language } from "../entities/book.entity";

export class GetBookFilterDto {
    search?: string;
    language?: Language;
    author?: string;
    publicationDate?: string;
}