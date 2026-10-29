
# User Management REST API

A REST API for managing user records using Node.js, Express.js, and MongoDB.

## Features

- Create a new user
- Retrieve all users
- Retrieve a user by ID
- Update user details
- Delete a user
- Validate user input
- Prevent duplicate email addresses
- Store user records in MongoDB Atlas
- Handle common API errors

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Nodemon
- Postman

## Project Structure

```text
user-management-api/
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd user-management-api
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string.

**Never share or commit your `.env` file.**

### 4. Start the server

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

The API runs at:

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check API status |
| POST | `/api/users` | Create a user |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Example Request: Create a User

**POST** `/api/users`

Request body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "age": 25
}
```

Example successful response:

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "generated_mongodb_id",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "age": 25
  }
}
```

The actual response includes a MongoDB-generated ID and timestamps.

## Testing

The API endpoints were tested using Postman.

- Create user: `201 Created`
- Retrieve users: `200 OK`
- Retrieve user by ID: `200 OK`
- Update user: `200 OK`
- Delete user: `200 OK`

## Error Handling

The API handles invalid user data, duplicate email addresses, invalid user IDs, and users that cannot be found.

## Security Notes

- Database credentials are stored in environment variables.
- The `.env` file is excluded from Git using `.gitignore`.
- This project manages user records and does not currently implement authentication or authorization.

## Future Improvements

- Add JWT-based authentication and authorization.
- Add pagination and search.
- Add automated tests.
- Add API documentation using Swagger.

## Author

Sandhya R
