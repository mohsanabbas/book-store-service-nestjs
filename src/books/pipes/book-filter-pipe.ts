import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BookStatus } from '../book-status.enum';

export class BookStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    BookStatus.AVAILABLE,
    BookStatus.INSTOCK,
    BookStatus.UNAVAILABLE,
    BookStatus.SOLD,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
