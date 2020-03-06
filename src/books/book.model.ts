export interface Book {
  id: string;
  title: string;
  description: string;
  status: BookStatus;
  author: string;
  pages: number;
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  INSTOCK = 'INSTOCK',
  UNAVAILABLE = 'UNAVAILABLE',
}
