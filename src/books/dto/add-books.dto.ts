import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class AddBookDto {
  @IsNotEmpty()
  readonly title: string;
  @IsOptional()
  readonly status: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  readonly author: string;
  @IsNumberString()
  readonly pages: number;
}
