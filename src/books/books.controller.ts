import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, BookStatus } from './book.model';
import { AddBookDto } from './dto/add-books.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-filter-pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAllBooks(@Query(ValidationPipe) filterDto: GetBookFilterDto): Book[] {
    if (Object.keys(filterDto).length) {
      return this.bookService.getBooksWithFilters(filterDto);
    } else {
      return this.bookService.getAllBooks();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Book {
    return this.bookService.getBookById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  addBook(@Body() addBookDto: AddBookDto): Book {
    return this.bookService.addBook(addBookDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.bookService.deleteBook(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ): Book {
    return this.bookService.updateBookStatus(id, status);
  }
}
