import z from "zod";

const bookZodSchema = z.object({
  // title
  title: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Title is required"
        : "Title must be a string",
  }),

  // author
  author: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Author is required"
        : "Author must be a string",
  }),

  // genre
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      error: (issue) =>
        issue.input === undefined
          ? "Genre is required"
          : "Please select a valid genre: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, or FANTASY.",
    }
  ),

  // isbn
  isbn: z.string({
    error: (issue) =>
      issue.input === undefined ? "ISBN is required" : "ISBN must be a string",
  }),

  // description
  description: z
    .string({
      error: (issue) => "Description must be a string",
    })
    .optional(),

  // copies
  copies: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Copies is required"
          : "Copies must be a number",
    })
    .int("Copies must be an integer")
    .min(0, "Copies must be a non-negative number"),

  // available
  available: z
    .boolean({
      error: (issue) => "Available must be a boolean",
    })
    .optional(),
});

// create a partial schema for update
export const bookUpdateZodSchema = bookZodSchema.partial();

export default bookZodSchema;
