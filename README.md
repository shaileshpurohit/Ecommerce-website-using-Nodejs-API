# Node.js Website API

A comprehensive Node.js REST API and GraphQL API application for managing users
and posts with authentication, file uploads, and real-time capabilities.

## ✨ Features

### Authentication & User Management

- **User Registration**: Create new user accounts with email, name, and password
- **User Login**: Secure authentication using JWT tokens
- **Password Security**: Passwords are hashed using bcryptjs
- **User Status**: Get and update user status/profile information
- **JWT Token Authentication**: Secure token-based authentication (1 hour
  expiration)

### Post Management

- **Create Posts**: Create posts with title, content, and image
- **Get All Posts**: Retrieve paginated list of posts (2 posts per page)
- **Get Single Post**: Fetch individual post by ID
- **Update Posts**: Update existing posts (only by creator)
- **Delete Posts**: Delete posts (only by creator)
- **Post Images**: Upload and manage post images
- **Real-time Updates**: Socket.io integration for real-time post updates
  (create, update, delete)

### File Upload

- **Image Upload**: Upload images for posts (PNG, JPG, JPEG formats)
- **Image Storage**: Images stored in `/images` directory with timestamped
  filenames
- **Image Cleanup**: Automatic cleanup of old images when updating/deleting
  posts
- **Image Serving**: Static file serving for uploaded images

### API Architecture

- **REST API**: Traditional REST endpoints for feed operations
- **GraphQL API**: Modern GraphQL API with GraphiQL interface
- **Dual API Support**: Both REST and GraphQL available for different use cases

### Security Features

- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Input Validation**: Request validation using express-validator
- **Authorization**: Middleware-based authentication and authorization
- **Error Handling**: Comprehensive error handling with proper status codes

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.0.2
- **Authentication**: JSON Web Tokens (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 3.0.3
- **File Upload**: Multer 2.0.2
- **GraphQL**: express-graphql 0.12.0, graphql 16.12.0
- **Validation**: express-validator 7.3.1
- **Real-time**: Socket.io 4.8.3
- **Body Parser**: body-parser 2.2.1
- **Development**: nodemon 3.1.11

## 📁 Project Structure

```
Nodejs-Website-API/
├── app.js                 # Main application entry point
├── package.json           # Project dependencies and scripts
├── README.md             # Project documentation
├── controllers/          # Route controllers
│   ├── auth.js          # Authentication controllers (signup, login, user status)
│   └── feed.js          # Post/feed controllers (CRUD operations)
├── models/              # MongoDB models
│   ├── user.js         # User model schema
│   └── post.js         # Post model schema
├── middleware/         # Express middleware
│   └── auth.js        # JWT authentication middleware
├── graphql/           # GraphQL implementation
│   ├── schema.js     # GraphQL schema definitions
│   └── resolvers.js  # GraphQL resolvers
├── util/             # Utility functions
│   └── file.js      # File management utilities
└── images/          # Uploaded images storage directory
```

## 📡 API Endpoints

### REST API Endpoints

#### Authentication Endpoints

_(Note: These are implemented in controllers but need to be registered in app.js
with routes)_

- **POST** `/auth/signup` - Register a new user
  ```json
  {
      "email": "user@example.com",
      "name": "John Doe",
      "password": "password123"
  }
  ```

- **POST** `/auth/login` - Login user
  ```json
  {
      "email": "user@example.com",
      "password": "password123"
  }
  ```
  Response:
  ```json
  {
      "token": "jwt_token_here",
      "userId": "user_id_here"
  }
  ```

- **GET** `/auth/status` - Get user status (requires authentication) Headers:
  `Authorization: Bearer <token>`

- **PUT** `/auth/status` - Update user status (requires authentication) Headers:
  `Authorization: Bearer <token>` Body:
  ```json
  {
      "status": "New status message"
  }
  ```

#### Post/Feed Endpoints

_(Note: These are implemented in controllers but need to be registered in app.js
with routes)_

- **GET** `/feed/posts?page=1` - Get paginated posts (2 per page) Headers:
  `Authorization: Bearer <token>`

- **POST** `/feed/post` - Create a new post Headers:
  `Authorization: Bearer <token>` Body (multipart/form-data):
  - `title`: Post title
  - `content`: Post content
  - `image`: Image file (PNG, JPG, JPEG)

- **GET** `/feed/post/:postId` - Get single post Headers:
  `Authorization: Bearer <token>`

- **PUT** `/feed/post/:postId` - Update post (only by creator) Headers:
  `Authorization: Bearer <token>` Body (multipart/form-data):
  - `title`: Post title
  - `content`: Post content
  - `image`: (optional) New image file
  - `oldpath`: (optional) Path to old image for deletion

- **DELETE** `/feed/post/:postId` - Delete post (only by creator) Headers:
  `Authorization: Bearer <token>`

#### Image Upload Endpoint

- **PUT** `/post-image` - Upload/update post image Headers:
  `Authorization: Bearer <token>` Body (multipart/form-data):
  - `image`: Image file
  - `oldpath`: (optional) Path to old image for deletion

## 🔷 GraphQL API

### GraphQL Endpoint

- **URL**: `http://localhost:8020/graphql`
- **GraphiQL Interface**: Available at the same URL (for testing)

### GraphQL Queries

#### Login

```graphql
query {
  login(email: "user@example.com", password: "password123") {
    token
    userId
  }
}
```

#### Get Posts (Paginated)

```graphql
query {
  posts(page: 1) {
    posts {
      _id
      title
      content
      imageUrl
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
    }
    totalPosts
  }
}
```

#### Get Single Post

```graphql
query {
  post(id: "post_id_here") {
    _id
    title
    content
    imageUrl
    createdAt
    updatedAt
    creator {
      _id
      name
      email
    }
  }
}
```

#### Get Current User

```graphql
query {
  user {
    _id
    name
    email
    status
    posts {
      _id
      title
    }
  }
}
```

### GraphQL Mutations

#### Create User

```graphql
mutation {
  createUser(userInput: {
    email: "user@example.com"
    name: "John Doe"
    password: "password123"
  }) {
    _id
    email
    name
  }
}
```

#### Create Post

```graphql
mutation {
  createPost(postInput: {
    title: "My First Post"
    content: "This is the content of my post"
    imageUrl: "images/2026-01-06T17:35:33.365Z-download.jpeg"
  }) {
    _id
    title
    content
    imageUrl
    createdAt
  }
}
```

#### Update Post

```graphql
mutation {
  updatePost(id: "post_id_here", postInput: {
    title: "Updated Title"
    content: "Updated content"
    imageUrl: "images/new-image.jpeg"
  }) {
    _id
    title
    content
    updatedAt
  }
}
```

#### Delete Post

```graphql
mutation {
  deletePost(id: "post_id_here")
}
```

#### Update User Status

```graphql
mutation {
  updateStatus(status: "I'm a developer!") {
    _id
    name
    status
  }
}
```

## 🔐 Authentication

### How Authentication Works

1. **JWT Token**: After login, users receive a JWT token
2. **Token Expiration**: Tokens expire after 1 hour
3. **Authorization Header**: Include token in requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
4. **Middleware**: The `auth.js` middleware validates tokens on protected routes
5. **User Context**: Authenticated user ID is available in `req.userId` and
   `req.isAuth`

### Protected Routes

Most endpoints require authentication. The middleware sets:

- `req.isAuth`: Boolean indicating if user is authenticated
- `req.userId`: User ID from the token

## 📤 File Upload

### Supported Formats

- PNG (image/png)
- JPG (image/jpg)
- JPEG (image/jpeg)

### Upload Process

1. Images are uploaded using `multipart/form-data`
2. Files are stored in the `/images` directory
3. Filenames are timestamped: `YYYY-MM-DDTHH:mm:ss.sssZ-originalname.ext`
4. Old images are automatically deleted when updating/deleting posts

### Accessing Images

Uploaded images are accessible at:

```
http://localhost:8020/images/<filename>
```
## 📌 Notes

- The REST API endpoints are implemented in controllers but need route
  registration in `app.js`
- Socket.io is referenced in the code but requires a `socket.js` file for full
  real-time functionality
- Default JWT secret should be changed in production
- MongoDB connection string needs to be configured before running
- Image upload directory (`images/`) should exist or will be created
  automatically

## 🐛 Error Handling

The application includes comprehensive error handling:

- **422**: Validation errors
- **401**: Authentication errors
- **403**: Authorization errors (unauthorized access)
- **404**: Resource not found
- **500**: Server errors

All errors return JSON responses with error messages and status codes.

## 📄 License

ISC

## 👤 Author

Shailesh Purohit

---
