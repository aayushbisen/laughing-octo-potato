import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, Language } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';

@Injectable()
export class BooksService {
    private books: Book[] = [
        {
            id: 11,
            title: 'Mes aventures du codes',
            publicationDate: '2022-02-28',
            numberOfPages: 10,
            author: 'John Doe',
            language: Language.FRENCH,
        },
        {
            id: 21,
            title: 'Shadows of Tomorrow',
            author: 'John Smith',
            publicationDate: '2021-01-10',
            numberOfPages: 400,
            language: Language.ENGLISH,
        }
    ]
    findBooks(query: GetBookFilterDto) {
        const { search, language, author, publicationDate } = query;

        let filteredBooks = [...this.books];

        if (search) {
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase()));
        }

        if (language) {
            filteredBooks = filteredBooks.filter(book => book.language === language);
        }

        if (author) {
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === author.toLowerCase());
        }

        if (publicationDate) {
            filteredBooks = filteredBooks.filter(book => book.publicationDate === publicationDate);
        }


        return filteredBooks;
    }

    createBook(data: CreateBookDto) {
        const book = {
            id: 1,
            ...data
        }

        this.books.push(book);

        return book;
    }

    findBookById(id: number) {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    updateBook(id: number, data: UpdateBookDto) {
        const book = this.findBookById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        Object.assign(book, data);
        return book;
    }

    removeBook(id: number) {
        const idx = this.books.findIndex(book => book.id === id);
        if (idx === -1) {
            throw new NotFoundException('Book not found');
        }
        this.books.splice(idx, 1);
        return { message: 'Book deleted successfully' };
    }
}
