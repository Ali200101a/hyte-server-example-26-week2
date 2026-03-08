# Backend Project

This is a simple REST API backend server built with Node.js and Express. It's a practice project for learning how to create RESTful endpoints, handle validation, and manage errors properly.

## Data Storage

The project doesn't use a real database. Instead, it uses **in-memory data storage** with JavaScript arrays. This means all data is stored in variables and gets reset every time you restart the server. 

There are two main data collections:
- **Items** - Simple objects with id and name (like fruits: Omena, Appelsiini, Banaaneja)
- **Users** - Objects with id, username, password, and email

The data only exists while the server is running, so it's not persistent. Good for learning and testing, but not for production.

## Features

Here's what the project includes:

- Express server running on port 3000
- Two separate API routes: `/api/items` and `/api/users`
- Full CRUD operations for both resources (Create, Read, Update, Delete)
- Input validation using express-validator (for users only)
- Custom error handling middleware
- 404 handler for unknown routes
- Password hiding - when you fetch user data, passwords are automatically removed from the response for security

## API Endpoints

### Items Endpoints
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a specific item by id
- `POST /api/items` - Create a new item (requires `name` in request body)
- `PUT /api/items/:id` - Update an item by id
- `DELETE /api/items/:id` - Delete an item by id

### Users Endpoints
- `GET /api/users` - Get all users (passwords hidden)
- `GET /api/users/:id` - Get a specific user by id (password hidden)
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user by id
- `DELETE /api/users/:id` - Delete a user by id

### User Validation Rules
When creating or updating users, these rules apply:
- **Email**: must be a valid email format
- **Username**: 3-20 characters, only letters and numbers
- **Password**: minimum 8 characters

## Validation and Error Handling

The project uses `express-validator` to validate incoming data, but only for the users endpoints. Items endpoints don't have validation beyond basic checks in the controller.

Error handling includes:
- **Validation errors** - Returns 400 status with details about which fields are invalid
- **404 errors** - When a resource is not found or route doesn't exist
- **General error handler** - Catches any other errors and returns 500 status

If validation fails, you'll get a response like this:
```json
{
  "message": "Invalid request",
  "errors": [
    {
      "field": "email",
      "message": "Invalid value"
    }
  ]
}
```

## Known Issues and Limitations

- No real database - all data is lost when the server restarts
- Items endpoints don't have proper validation
- Passwords are stored in plain text (not secure at all!)
- No authentication or authorization
- The validation on PUT requests makes all fields optional, so you can send an empty body
- User IDs are generated based on the highest existing ID, which could cause issues if users are deleted

## How to Run Locally

1. Make sure you have Node.js installed on your computer

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The server will start at `http://127.0.0.1:3000/`

You can test it by visiting `http://127.0.0.1:3000/` in your browser or using a tool like Postman to make API requests to the endpoints.

## References

- [Express.js documentation](https://expressjs.com/)
- [express-validator documentation](https://express-validator.github.io/docs/)
- Course materials and lecture examples

---