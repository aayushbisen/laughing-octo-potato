import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}


    @Get()
    findAll(@Query() query: GetBookFilterDto) {
        return this.booksService.findBooks(query);
    }

    @Post()
    create(@Body() body: CreateBookDto){
        return this.booksService.createBook(body);
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findBookById(parseInt(id));
    }


    @Patch(':id')
    update(@Param('id')id: string, @Body() body: UpdateBookDto){
        return this.booksService.updateBook(parseInt(id), body);
    }


    @Delete(':id')
    remove(@Param('id')id: string){
        return this.booksService.removeBook(parseInt(id));
    }
}
