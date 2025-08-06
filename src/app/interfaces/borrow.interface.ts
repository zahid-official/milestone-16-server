import { Types } from "mongoose";

interface BorrowInterface {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export default BorrowInterface;
