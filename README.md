 Expense Tracker API

 1. Project Overview

The Expense Tracker is a backend application built using Node.js core modules.

It allows users to manage their daily expenses through REST API endpoints.

 Features

- Add a new expense
- Get all expenses
- Get a single expense by ID
- Filter expenses by category
- Filter expenses by date
- Update an expense using PUT
- Partially update an expense using PATCH
- Delete an expense
- Export expenses as a CSV file
- Import expenses from a CSV file
- Store expense data in a JSON file
- Request ID middleware
- Request logging
- Error handling

 2. Technologies Used

- Node.js
- JavaScript (ES Modules)
- HTTP Module
- File System Module (`node:fs`)
- Crypto Module (`node:crypto`)
- Postman
- JSON
- CSV

No Express.js framework is used.

 3. Project Structure

ExpenseTracker/
│
├── controllers/
│   ├── expensecontroller.js
│   ├── csvexportcontroller.js
│   └── csvimportcontroller.js
│
├── data/
│   └── expense.json
│
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   ├── notFound.js
│   └── requestId.js
│
├── models/
│   └── expensemodel.js
│
├── routes/
│   └── expenseroutes.js
│
├── utils/
│   ├── csvexport.js
│   ├── csvimport.js
│   └── filestore.js
│
├── package.json
└── server.js

 4. Installation and Setup

 Step 1: Clone the repository

bash
git clone [(https://github.com/anushak2464/ExpenseTracker.git)]


Step 2: Open the project folder

bash
cd ExpenseTracker

 Step 3: Start the server

bash
node server.js


The server runs at:

text
http://localhost:3000

 5. API Endpoints

Base URL:

text
http://localhost:3000


 5.1 Add a New Expense

Method: POST

Endpoint:

text
/api/expenses

Sample request body:

json
{
  "title": "Lunch",
  "amount": 250,
  "category": "food",
  "paymentMethod": "Cash",
  "date": "2026-11-15",
  "note": "Lunch with friends"
}

Success response: '201 Created'

 5.2 Get All Expenses

Method: GET

text
/api/expenses

 5.3 Get Expense by ID

Method: GET

text
/api/expenses/EXPENSE_ID

 5.4 Filter Expenses by Category

Method: GET

text
/api/expenses?category=food


 5.5 Filter Expenses by Date

Method: GET

text
/api/expenses?date=2026-11-15


 5.6 Update an Expense (PUT)

Method: PUT

text
/api/expenses/EXPENSE_ID


PUT updates the expense using the complete set of required fields.

 5.7 Partially Update an Expense (PATCH)

Method: PATCH

text
/api/expenses/EXPENSE_ID

Sample request body:

json
{
  "note": "Updated expense note"
}


PATCH updates only the fields provided.

 5.8 Delete an Expense

Method: DELETE

text
/api/expenses/EXPENSE_ID


 5.9 Export Expenses to CSV

Method: GET

text
/api/expenses/export


This endpoint exports expense records as a CSV file.

 5.10 Import Expenses from CSV

Method: POST

/api/expenses/import

Send CSV content as the raw request body with a supported CSV content type.

Sample CSV content:

csv
title,amount,category,paymentMethod,date,note
Lunch,250,food,Cash,2026-11-15,Lunch with friends
Travel,500,travel,UPI,2026-11-15,Bus ticket
Shopping,1200,shopping,Card,2026-11-16,Clothes
```

 6. Middleware

 Request ID Middleware

Generates a unique ID for each request and adds it to the response header.

 Logger Middleware

Logs request details such as:

- Timestamp
- HTTP method
- Request URL
- Response status code
- Request duration

 Error Handler Middleware

Handles errors centrally and sends an error response to the client.

 Not Found Middleware

Handles requests to unknown API routes.

 7. Data Storage

Expense records are stored in:

data/expense.json


The application uses Node.js file system operations to read and write expense data.

 8. Testing

API endpoints can be tested using Postman.

Test the following operations:

- POST – Create an expense
- GET – Fetch all expenses
- GET – Fetch an expense by ID
- GET – Filter by category
- GET – Filter by date
- PUT – Update an expense
- PATCH – Partially update an expense
- DELETE – Delete an expense
- GET – Export CSV
- POST – Import CSV


 9. Future Improvements

- Command-line interface (CLI)
- Monthly expense summary
- Automated tests
- Improved validation and error handling


Anusha Babu K

GitHub: (https://github.com/anushak2464/ExpenseTracker.git)