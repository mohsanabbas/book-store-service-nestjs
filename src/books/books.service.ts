import { Injectable, NotFoundException } from '@nestjs/common';
import { AddBookDto } from './dto/add-books.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookStatus } from './book-status.enum';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(filterDto: GetBookFilterDto): Promise<Book[]> {
    return this.bookRepository.getBooks(filterDto);
  }
  async getBookById(id: number): Promise<Book> {
    const found = await this.bookRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  async addBook(addBookDto: AddBookDto): Promise<Book> {
    return this.bookRepository.addBook(addBookDto);
  }

  async deleteBook(id: number): Promise<void> {
    const result = await this.bookRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async updateBookStatus(id: number, status: BookStatus): Promise<Book> {
    const book = await this.getBookById(id);
    book.status = status;
    await book.save();
    return book;
  }
}
