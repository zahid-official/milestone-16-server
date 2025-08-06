# Shelfy - Library Management API

A comprehensive library management system built with Node.js, Express, TypeScript, and MongoDB. This system allows you to manage books and track borrowing activities with proper business logic enforcement.

## 🎯 Objective

Develop a Library Management System using Express, TypeScript, and MongoDB (via Mongoose) with advanced features including:

- **Proper schema validation** with Zod
- **Business logic enforcement** (availability control on borrow)
- **MongoDB aggregation pipeline** for borrowed books summary
- **Mongoose static methods** for complex operations
- **Mongoose middleware** (pre/post hooks)
- **Advanced filtering** and sorting capabilities

## Features

- **Book Management**: Create, read, update, and delete books
- **Borrowing System**: Track which books are borrowed with quantity control
- **Search & Filter**: Filter books by genre and sort them by various fields
- **Validation**: Strong input validation using Zod with custom error messages
- **Error Handling**: Comprehensive error handling with clear, structured responses
- **Database**: MongoDB with Mongoose for robust data management
- **Business Logic**: Automatic availability control and copy management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Environment**: dotenv for configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd library-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_NAME=your_database_name
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── book.controller.ts
│   │   │   └── borrow.controller.ts
│   │   ├── interfaces/
│   │   │   ├── book.interface.ts
│   │   │   └── borrow.interface.ts
│   │   ├── models/
│   │   │   ├── book.model.ts
│   │   │   └── borrow.model.ts
│   │   ├── middlewares/
│   │   │   ├── globalErrorHandler.ts
│   │   │   └── routeNotFoundHandler.ts
│   │   └── zodSchemas/
│   │       ├── book.zod.ts
│   │       └── borrow.zod.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── README.md
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Response Format

All API responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "name": "ErrorName",
    "description": "Detailed error description"
  }
}
```

## Books API

### 1. Get All Books

**GET** `/api/books`

**Query Parameters:**
- `filter` (optional): Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sort` (optional): Sort order - "asc" or "desc" (default: "asc")
- `sortBy` (optional): Sort field (default: "createdAt")
- `limit` (optional): Number of books to return (default: 10)

**Example:**
```bash
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

**Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

### 2. Get Single Book

**GET** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### 3. Create New Book

**POST** `/api/books`

**Request Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

**Required Fields:**
- `title` (string)
- `author` (string)
- `genre` (enum: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `isbn` (string, must be unique)
- `copies` (integer, minimum 0)

**Optional Fields:**
- `description` (string)

### 4. Update Book

**PUT** `/api/books/:bookId`

**Request Body:** (All fields are optional)
```json
{
  "copies": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### 5. Delete Book

**DELETE** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

## Borrowing API

### 1. Get Borrowed Books Summary

**GET** `/api/borrow`

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

### 2. Borrow a Book

**POST** `/api/borrow`

**Request Body:**
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```

**Business Logic:**
- Verifies the book has enough available copies
- Deducts the requested quantity from the book's copies
- If copies become 0, updates `available` to false (using static method)
- Saves the borrow record with all relevant details

**Required Fields:**
- `book` (string): Valid MongoDB ObjectId of the book
- `quantity` (integer): Number of copies to borrow (minimum 1)
- `dueDate` (string): Due date in YYYY-MM-DD format (must be future date)

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

## Error Handling

### Common Error Responses

**404 Not Found:**
```json
{
  "success": false,
  "message": "Book not found",
  "error": {
    "name": "404 Not found",
    "description": "The provided book ID is invalid. Please ensure you are using a valid ID that exists in the book collection."
  }
}
```

**400 Validation Error:**
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

**400 Insufficient Copies:**
```json
{
  "success": false,
  "message": "Not enough copies available to borrow",
  "error": {
    "name": "Insufficient copies error",
    "description": "The requested book is currently unavailable because all copies have already been borrowed. Please try again later or select a different book."
  }
}
```

## Database Schema

### Book Schema
```typescript
{
  title: string (required)
  author: string (required)
  genre: enum (required) - FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
  isbn: string (required, unique)
  description: string (optional)
  copies: number (required, minimum 0, integer)
  available: boolean (auto-calculated based on copies)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Borrow Schema
```typescript
{
  book: ObjectId (required, references Book)
  quantity: number (required, minimum 1, integer)
  dueDate: Date (required, must be future date)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Advanced Features

### MongoDB Aggregation Pipeline
The system uses MongoDB aggregation pipeline for the borrowed books summary:
- **$group**: Groups borrow records by book ID and sums quantities
- **$lookup**: Joins with book collection to get book details
- **$unwind**: Flattens the book details array
- **$project**: Formats the final output with book title, ISBN, and total quantity

### Mongoose Static Methods
Custom static method `borrowBook()` handles the complex borrowing logic:
- Validates book existence
- Checks available copies
- Updates book copies and availability
- Maintains data consistency

### Mongoose Middleware
Pre-save middleware automatically manages book availability:
- Sets `available: false` when copies reach 0
- Sets `available: true` when copies are greater than 0

### Business Logic Enforcement
- **Availability Control**: Books automatically become unavailable when all copies are borrowed
- **Copy Management**: System tracks exact number of copies and prevents over-borrowing
- **Date Validation**: Due dates must be in the future
- **Quantity Validation**: Ensures positive integers for copies and borrow quantities

## API Compliance

This API strictly follows the provided specifications:
- **Exact endpoints**: All endpoints match the required format
- **Response structures**: All responses follow the specified JSON format
- **Error handling**: Comprehensive error responses with proper status codes
- **Validation**: Strong input validation with detailed error messages

## Code Quality Features

- **Clean Architecture**: Well-organized code structure with separation of concerns
- **TypeScript**: Full TypeScript implementation for type safety
- **Error Handling**: Comprehensive error handling with clear messages
- **Validation**: Input validation using Zod with custom error messages
- **Middleware**: Custom middleware for global error handling and route protection

## Testing the API

### Using cURL

**Get all books:**
```bash
curl -X GET http://localhost:3000/api/books
```

**Create a new book:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5
  }'
```

**Borrow a book:**
```bash
curl -X POST http://localhost:3000/api/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18"
  }'
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3000) | No |
| `DB_USER` | MongoDB username | Yes |
| `DB_PASSWORD` | MongoDB password | Yes |
| `DB_NAME` | MongoDB database name | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

**Happy coding! 📚**