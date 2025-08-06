import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    // mongoDB connector
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tg4k9it.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Successfully connected to MongoDB using Mongoose");

    // server listener
    app.listen(port, () => {
      console.log(`Server running on ... ${port}`);
    });
  } catch (error) {
    console.error({
      message: "MongoDB connection failed",
      success: false,
      error: error,
    });
    process.exit(1);
  }
};
bootstrap();
