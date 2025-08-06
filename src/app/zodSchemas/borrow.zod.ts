import { Types } from "mongoose";
import { z } from "zod";

const borrowZodSchema = z.object({
  // book
  book: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Book is required"
          : "Book must be a string objectId",
    })
    .refine((value) => Types.ObjectId.isValid(value), {
      error: "Invalid ObjectId",
    }),

  //quantity
  quantity: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Quantity is required"
          : "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be a positive integer"),

  // dueDate
  dueDate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Due date is required"
          : "Due date must be a string date format",
    })
    .transform((value) => new Date(value))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    })
    .refine((date) => date >= new Date(), {
      message: "Due date must be in the future",
    }),
});

export default borrowZodSchema;
