import { BookStatus } from '../book-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetBookFilterDto {
  @IsOptional()
  @IsIn([
    BookStatus.AVAILABLE,
    BookStatus.SOLD,
    BookStatus.UNAVAILABLE,
    BookStatus.INSTOCK,
  ])
  status: BookStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
