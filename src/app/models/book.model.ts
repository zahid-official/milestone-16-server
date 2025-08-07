import { model, Schema, UpdateQuery } from "mongoose";
import BookInterface, { BookStaticMethod } from "../interfaces/book.interface";

// book schema
const bookSchema = new Schema<BookInterface, BookStaticMethod>(
  {
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer number",
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// pre-save middleware for available
bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

// pre-findOneAndUpdate middleware for available
bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<{
    copies: number;
    available: boolean;
  }>;

  if (update?.copies !== undefined) {
    if (update.copies === 0) {
      update.available = false;
    } else {
      update.available = true;
    }
    this.setUpdate(update);
  }

  next();
});

// static method for borrow book
bookSchema.static(
  "borrowBook",
  async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);

    // validation
    if (!book) {
      const error = new Error("Book not found") as any;
      error.status = 404;
      error.name = "404 Not found";
      error.description =
        "The provided book ID is invalid. Please ensure you are using a valid ID that exists in the book collection.";
      throw error;
    }

    // check copies qunatity
    if (book?.copies < quantity) {
      const error = new Error("Not enough copies available to borrow") as any;
      error.status = 400;
      error.name = "Insufficient copies error";
      error.description =
        "The requested book is currently unavailable because all copies have already been borrowed. Please try again later or select a different book.";
      throw error;
    }

    // reduce copies qunatity & update availablity
    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    // update book data in database using mongoose document instance method
    await book.save();
    return book;
  }
);

// book model
const Book = model<BookInterface, BookStaticMethod>(
  "Book",
  bookSchema,
  "bookCollection"
);

export default Book;
