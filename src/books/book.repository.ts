import { Repository, EntityRepository } from 'typeorm';
import { Book } from './book.entity';
import { AddBookDto } from './dto/add-books.dto';
import { BookStatus } from './book-status.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { GetBookFilterDto } from './dto/get-book-filter.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(filterDto: GetBookFilterDto): Promise<Book[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('book');

    // query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('book.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(book.title LIKE :search OR book.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addBook(addBookDto: AddBookDto): Promise<Book> {
    const { title, description, author, pages } = addBookDto;
    const book = new Book();
    book.title = title;
    book.description = description;
    book.author = author;
    book.pages = pages;
    book.status = BookStatus.AVAILABLE;

    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return book;
  }
}
