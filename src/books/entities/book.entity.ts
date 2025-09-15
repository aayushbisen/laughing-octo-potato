export enum Language {
    ENGLISH = 'en',
    FRENCH = 'fr'
}

export class Book {
    id: number;
    title: string;
    author: string;
    language: Language;
    publicationDate: string;
    numberOfPages: number;
}