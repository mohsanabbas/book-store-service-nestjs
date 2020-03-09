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
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AddBookDto } from './dto/add-books.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-filter-pipe';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetBookFilterDto,
  ): Promise<Book[]> {
    return this.bookService.getBooks(filterDto);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() addBookDto: AddBookDto): Promise<Book> {
    return this.bookService.addBook(addBookDto);
  }
  @Delete('/:id')
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.bookService.deleteBook(id);
  }
  @Patch('/:id/status')
  updateBookStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ): Promise<Book> {
    return this.bookService.updateBookStatus(id, status);
  }
}
