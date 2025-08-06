import { Model } from "mongoose";

// book interface
interface BookInterface {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

// static method for borrow book
export interface BookStaticMethod extends Model<BookInterface> {
  borrowBook(bookId: string, quantity: number): Promise<BookInterface>;
}

export default BookInterface;
