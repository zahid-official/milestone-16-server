import express, { NextFunction, Request, Response } from "express";
import borrowZodSchema from "../zodSchemas/borrow.zod";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";

// borrow router
const borrowRouter = express.Router();

// read operations
{
  borrowRouter.get(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Borrow.aggregate([
          // state-1 group books by objectId
          {
            $group: {
              _id: "$book",
              totalQuantity: { $sum: "$quantity" },
            },
          },

          // Stage 2: join with bookCollection to get book details
          {
            $lookup: {
              from: "bookCollection",
              localField: "_id",
              foreignField: "_id",
              as: "bookDetails",
            },
          },

          // stage-3 unwind book field array
          {
            $unwind: "$bookDetails",
          },

          // stage-4 final output
          {
            $project: {
              _id: 0,
              book: {
                title: "$bookDetails.title",
                isbn: "$bookDetails.isbn",
              },
              totalQuantity: 1,
            },
          },
        ]);

        res.json({
          success: true,
          message: "Borrowed books summary retrieved successfully",
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
  borrowRouter.post(
    "/",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const body = await borrowZodSchema.parseAsync(req.body);

        // check book availability and update database
        await Book.borrowBook(body?.book, body?.quantity);

        const result = await Borrow.create(body);

        res.json({
          success: true,
          message: "Book borrowed successfully",
          data: result,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default borrowRouter;
