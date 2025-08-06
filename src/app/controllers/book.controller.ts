import express, { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import bookZodSchema, { bookUpdateZodSchema } from "../zodSchemas/book.zod";

// book router
const bookRouter = express.Router();

// read operations
{
  // get all books
  bookRouter.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const filter = req.query.filter || "";
        const sort = req.query.sort || "asc";
        const sortBy = req.query.sortBy || "createdAt";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        // filter condition
        const query =
          typeof filter === "string" && filter.trim() !== ""
            ? { genre: filter }
            : {};

        // sortBy field
        const sortField = typeof sortBy === "string" ? sortBy : "createdAt";

        // sort in accending or decending
        const sortOrder =
          typeof sort === "string" &&
          (sort.toLowerCase() === "desc" || sort === "-1")
            ? -1
            : 1;

        // pagination
        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / limit);

        const result = await Book.find(query)
          .sort({
            [sortField]: sortOrder,
          })
          .skip((page - 1) * limit)
          .limit(limit);

        res.json({
          success: true,
          message: "Books retrieved successfully",
          data: result,
          pagination: {
            total: totalBooks,
            page,
            limit,
            totalPages,
          },
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // get a book
  bookRouter.get(
    "/:bookId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.bookId;
        const result = await Book.findById(id);

        res.json({
          success: true,
          message: "Book retrieved successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

// create operations
{
  bookRouter.post(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = await bookZodSchema.parseAsync(req.body);
        const result = await Book.create(body);
        res.json({
          success: true,
          message: "Book created successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

// update operations
{
  bookRouter.put(
    "/:bookId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.bookId;
        const body = await bookUpdateZodSchema.parseAsync(req.body);
        const result = await Book.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });

        res.json({
          success: true,
          message: "Book updated successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

// delete operations
{
  bookRouter.delete(
    "/:bookId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.bookId;
        await Book.findByIdAndDelete(id);

        res.json({
          success: true,
          message: "Book deleted successfully",
          data: null,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}
export default bookRouter;
