import express, { Application, Request, Response } from "express";
import bookRouter from "./app/controllers/book.controller";
import borrowRouter from "./app/controllers/borrow.controller";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routeNotFoundHandler from "./app/middlewares/routeNotFoundHandler";
import cors from "cors";

// application
const app: Application = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://shelfy-official.vercel.app"],
  })
);

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Server connected successfully");
});

// handle route error
app.use(routeNotFoundHandler);

// global error
app.use(globalErrorHandler);

export default app;
