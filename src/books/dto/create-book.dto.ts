import { Language } from "../entities/book.entity";

export class CreateBookDto {
    title: string;
    author: string;
    language: Language;
    publicationDate: string;
    numberOfPages: number;
}