import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class AddBookDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  status: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  author: string;
  @IsNumberString()
  pages: number;
}
