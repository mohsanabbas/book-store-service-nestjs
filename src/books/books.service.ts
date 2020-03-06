import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import * as uuid from 'uuid/v1';
import { AddBookDto } from './dto/add-books.dto';
import { GetBookFilterDto } from './dto/get-book-filter.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  getAllBooks(): Book[] {
    return this.books;
  }
  getBooksWithFilters(filterDto: GetBookFilterDto): Book[] {
    const { status, search } = filterDto;
    let books = this.getAllBooks();

    if (status) {
      books = books.filter(book => book.status === status);
    }

    if (search) {
      books = books.filter(
        book =>
          book.title.includes(search) || book.description.includes(search),
      );
    }

    return books;
  }
  getBookById(id: string): Book {
    const found = this.books.find(book => book.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }
  addBook(addBookDto: AddBookDto): Book {
    const { title, author, description, pages } = addBookDto;
    const book: Book = {
      id: uuid(),
      title,
      description,
      author,
      pages,
      status: BookStatus.AVAILABLE,
    };

    this.books.push(book);
    return book;
  }
  updateBookStatus(id: string, status: BookStatus): Book {
    const book = this.getBookById(id);
    book.status = status;
    return book;
  }
  deleteBook(id: string): void {
    const found = this.getBookById(id);
    this.books = this.books.filter(book => book.id !== found.id);
  }
}
