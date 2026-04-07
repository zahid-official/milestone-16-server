<div align="center">

<img src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png" alt="Shelfy Logo" width="60" />

# Shelfy - Backend API

The powerful RESTful server-side engine for the Shelfy Library Management System, built with Node.js, Express and MongoDB.

[![Client Repo](https://img.shields.io/badge/Client--Side-Repository-007ACC?style=for-the-badge&logo=react)](https://github.com/zahid-official/milestone-16-client)
[![GitHub Repo](https://img.shields.io/badge/Backend--Side-Repository-181717?style=for-the-badge&logo=github)](https://github.com/zahid-official/milestone-16-server)
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />

</div>

<br/>

## 🔍 Backend Overview

> **Shelfy Backend** is a production-ready API that serves as the core engine for the Shelfy ecosystem. It handles complex book inventory management and borrowing workflows with strict business logic enforcement and robust data validation.

This repository focuses exclusively on the **Server-Side logic**, providing a high-performance RESTful API for the [Shelfy Client-Side Application](https://github.com/zahid-official/milestone-16-client).

<br/>

## ✨ Key Features

### 📚 Book Management
<table align="center">
<thead>
<tr><th align="left">Feature</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><b>CRUD Operations</b></td><td>Create, read, update and delete books with full validation</td></tr>
<tr><td><b>Genre Filtering</b></td><td>Filter books by FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY</td></tr>
<tr><td><b>Advanced Sorting</b></td><td>Sort by any field in ascending or descending order with pagination</td></tr>
<tr><td><b>Unique ISBN</b></td><td>Enforces unique ISBN per book to prevent duplicate entries</td></tr>
</tbody>
</table>

### 🔄 Borrowing System
<table align="center">
<thead>
<tr><th align="left">Feature</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><b>Availability Control</b></td><td>Auto-updates book availability when all copies are borrowed</td></tr>
<tr><td><b>Copy Management</b></td><td>Tracks exact copy count and prevents over-borrowing</td></tr>
<tr><td><b>Due Date Validation</b></td><td>Enforces future-only due dates on every borrow request</td></tr>
<tr><td><b>Borrow Summary</b></td><td>Aggregated view of all borrowed books with total quantities</td></tr>
</tbody>
</table>

### 🛡️ Quality & Reliability
<table align="center">
<thead>
<tr><th align="left">Feature</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><b>Zod Validation</b></td><td>Strong schema-level validation with detailed error messages</td></tr>
<tr><td><b>Global Error Handler</b></td><td>Centralized middleware for consistent, structured error responses</td></tr>
<tr><td><b>Mongoose Middleware</b></td><td>Pre-save hooks for automatic availability management</td></tr>
<tr><td><b>Static Methods</b></td><td>Reusable Mongoose static method for complex borrow logic</td></tr>
</tbody>
</table>

<br/>

## 🛠️ Tech Stack

<table align="center">
<thead>
<tr><th align="left">Technology</th><th align="center">Version</th><th align="left">Purpose</th></tr>
</thead>
<tbody>
<tr><td><b>Node.js</b></td><td align="center"><code>LTS</code></td><td>JavaScript runtime environment</td></tr>
<tr><td><b>Express.js</b></td><td align="center"><code>^5.1.0</code></td><td>Web framework and routing</td></tr>
<tr><td><b>TypeScript</b></td><td align="center"><code>^5.8.3</code></td><td>Type-safe JavaScript superset</td></tr>
<tr><td><b>MongoDB</b></td><td align="center"><code>^6.17.0</code></td><td>NoSQL document database</td></tr>
<tr><td><b>Mongoose</b></td><td align="center"><code>^8.16.2</code></td><td>MongoDB ODM with schema validation</td></tr>
<tr><td><b>Zod</b></td><td align="center"><code>^4.0.3</code></td><td>Runtime schema validation</td></tr>
<tr><td><b>CORS</b></td><td align="center"><code>^2.8.5</code></td><td>Cross-origin resource sharing</td></tr>
<tr><td><b>dotenv</b></td><td align="center"><code>^17.2.0</code></td><td>Environment variable management</td></tr>
<tr><td><b>ts-node-dev</b></td><td align="center"><code>^2.0.0</code></td><td>TypeScript live-reload dev server</td></tr>
</tbody>
</table>

<br/>

## 🏗️ Architecture

<div>
<pre>
                            ┌──────────────────────────────────────────────────┐
                            │                   Client Request                 │
                            └───────────────────────┬──────────────────────────┘
                                                    │
                            ┌───────────────────────▼──────────────────────────┐
                            │              Express Application                 │
                            │         (CORS · JSON Parser · Routes)            │
                            └──────────┬────────────────────────┬──────────────┘
                                       │                        │
                            ┌──────────▼──────────┐  ┌──────────▼───────────────┐
                            │   /api/books        │  │   /api/borrow            │
                            │   Book Router       │  │   Borrow Router          │
                            └──────────┬──────────┘  └──────────┬───────────────┘
                                       │                        │
                            ┌──────────▼────────────────────────▼───────────────┐
                            │              Controllers (Zod Validation)         │
                            └──────────────────────────┬────────────────────────┘
                                                       │
                            ┌──────────────────────────▼────────────────────────┐
                            │         Mongoose Models (Static Methods,          │
                            │         Pre-save Middleware, Aggregation)         │
                            └──────────────────────────┬────────────────────────┘
                                                       │
                            ┌──────────────────────────▼────────────────────────┐
                            │                    MongoDB Atlas                  │
                            └───────────────────────────────────────────────────┘
</pre>
</div>

<br/>

## 📂 Project Structure

```
milestone-16-server/
├── src/
│   ├── app/
│   │   ├── controllers/        # Route handler logic
│   │   ├── interfaces/         # TypeScript type definitions
│   │   ├── models/             # Mongoose schemas & static methods
│   │   ├── middlewares/        # Global error & 404 handlers
│   │   └── zodSchemas/         # Zod validation schemas
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Entry point & DB connection
├── .env                        # Environment variables
├── package.json
└── README.md
```

<br/>

## 🚀 Getting Started

### Prerequisites

<table align="center">
<thead>
<tr><th align="left">Requirement</th><th align="left">Details</th></tr>
</thead>
<tbody>
<tr><td><b>Node.js</b></td><td>v18 or higher</td></tr>
<tr><td><b>MongoDB</b></td><td>Atlas account or local installation</td></tr>
<tr><td><b>Package Manager</b></td><td>npm or yarn</td></tr>
</tbody>
</table>

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zahid-official/milestone-16-server.git
   cd milestone-16-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_NAME=your_database_name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`

<br/>

## 🔑 Environment Variables

<table align="center">
<thead>
<tr><th align="left">Variable</th><th align="left">Description</th><th align="center">Required</th></tr>
</thead>
<tbody>
<tr><td><code>PORT</code></td><td>Server port (default: 3000)</td><td align="center">No</td></tr>
<tr><td><code>DB_USER</code></td><td>MongoDB Atlas username</td><td align="center">Yes</td></tr>
<tr><td><code>DB_PASSWORD</code></td><td>MongoDB Atlas password</td><td align="center">Yes</td></tr>
<tr><td><code>DB_NAME</code></td><td>Target MongoDB database name</td><td align="center">Yes</td></tr>
</tbody>
</table>

<br/>

## 📜 Available Scripts

<table align="center">
<thead>
<tr><th align="left">Script</th><th align="left">Command</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><b>Development</b></td><td><code>npm run dev</code></td><td>Start server with live reload via ts-node-dev</td></tr>
<tr><td><b>Test</b></td><td><code>npm test</code></td><td>Run test suite</td></tr>
</tbody>
</table>

<br/>

## ⚙️ API Reference

### Response Format

All API responses share a consistent structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### 📖 Books Endpoints

<table align="center">
<thead>
<tr><th align="left">Method</th><th align="left">Endpoint</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><code>GET</code></td><td><code>/api/books</code></td><td>Get all books (supports filter, sort, limit)</td></tr>
<tr><td><code>GET</code></td><td><code>/api/books/:bookId</code></td><td>Get a single book by ID</td></tr>
<tr><td><code>POST</code></td><td><code>/api/books</code></td><td>Create a new book</td></tr>
<tr><td><code>PUT</code></td><td><code>/api/books/:bookId</code></td><td>Update an existing book</td></tr>
<tr><td><code>DELETE</code></td><td><code>/api/books/:bookId</code></td><td>Delete a book</td></tr>
</tbody>
</table>

**Query Parameters for `GET /api/books`:**
- `filter` - Genre filter: `FICTION | NON_FICTION | SCIENCE | HISTORY | BIOGRAPHY | FANTASY`
- `sortBy` - Field to sort by (default: `createdAt`)
- `sort` - Order: `asc` or `desc` (default: `asc`)
- `limit` - Number of results (default: `10`)

### 🔄 Borrow Endpoints

<table align="center">
<thead>
<tr><th align="left">Method</th><th align="left">Endpoint</th><th align="left">Description</th></tr>
</thead>
<tbody>
<tr><td><code>GET</code></td><td><code>/api/borrow</code></td><td>Get aggregated borrowed books summary</td></tr>
<tr><td><code>POST</code></td><td><code>/api/borrow</code></td><td>Borrow a book (enforces availability & copy count)</td></tr>
</tbody>
</table>

<br/>

## 🌟 How It Works

**Borrow Flow:**

<div>
<pre>
                                       Client POST /api/borrow
                                                  │
                                                  ▼
                              Zod validates { book, quantity, dueDate }
                                                  │
                                                  ▼
                                BorrowModel.borrowBook() static method
                                                  │
                                            ┌─────┴──────┐
                                            │            │
                                            ▼            ▼
                                    Book exists?  Enough copies?
                                            │            │
                                            └─────┬──────┘
                                                  │ Yes
                                                  ▼
                                      Deduct copies from book
                                                  │
                                                  ▼
                              Pre-save hook sets available = (copies > 0)
                                                  │
                                                  ▼
                                Save borrow record → Return 201 response
</pre>
</div>

1. **Request received** - Zod validates all fields including future-date enforcement
2. **Static method invoked** - `BorrowModel.borrowBook()` handles the complete workflow
3. **Availability checked** - Ensures sufficient copies are available before proceeding
4. **Copy count updated** - Deducts borrowed quantity from the book document
5. **Middleware fires** - Pre-save hook automatically recalculates the `available` flag
6. **Borrow record saved** - Returns the new borrow document with a `201` status

<br/>

## 🌟 Author

<div align="center">
  <a href="https://github.com/zahid-official">
    <img src="https://github.com/zahid-official.png" width="100" height="100" style="border-radius: 50%;" alt="Zahid Official" />
  </a>

  <h3>Zahid Official</h3>
  <p><b>Web Developer | Tech Enthusiast</b></p>

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zahid-official)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/zahid-web)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:zahid.official8@gmail.com)

  <p>Crafting robust, type-safe APIs and clean architectural solutions.</p>
</div>

<br/>

## 🤝 Contributing

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/your-username/milestone-16-server.git

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Commit your changes
git commit -m "feat: add your feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

<br/>
<div align="center">
<p><b>Shelfy</b> - <i>Your books, managed with precision.</i></p>
</div>