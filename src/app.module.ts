import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BooksModule],
})
export class AppModule {}
