# TujiFund Frontend Documentation

## Project Overview
TujiFund is a web application designed for managing and interacting with Chamas (community savings groups). The frontend is built using React and Vite, providing a responsive and modern user interface.

## Folder Structure
```
frontend/
├── public/               # Static assets
├── src/                  # Source files
│   ├── components/       # Reusable components
│   ├── context/          # Context API for state management
│   ├── pages/            # Page components
│   ├── routes/           # Routing configuration
│   ├── styles/           # Global styles and themes
│   └── App.jsx           # Main application component
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Key Components
- **ProfileDialog**: Displays user profile information.
- **LanguageDialog**: Allows users to select their preferred language.
- **HelpDialog**: Provides help and FAQs for users.
- **NotificationsDialog**: Shows notifications related to user actions.
- **ChamaDashboardLayout**: Main layout for the Chama dashboard.
- **MainLayout**: Main layout for the application, containing navigation and sidebar.

## State Management
The application uses the Context API for state management, allowing global state to be shared across components. Key contexts include:
- **SearchContext**: Manages global search functionality.
- **ChamaContext**: Manages state related to Chama-specific data.

## API Endpoints
- **GET /api/chamas**: Fetches the list of Chamas.
- **POST /api/chamas**: Creates a new Chama.
- **GET /api/users/:id**: Fetches user profile information.

## Styling and Design
The application uses Material-UI for consistent styling and responsive design. Custom themes and styles are defined in the `styles` directory.

## Usage Instructions
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development server.
5. Open your browser and navigate to `http://localhost:5173/`.

## Future Enhancements
- Implement user authentication and authorization.
- Add more detailed help and documentation sections.
- Improve performance and accessibility features.

## Backend Overview
The backend for TujiFund is designed to handle data management, user authentication, and API services to support the frontend application. It will serve as the bridge between the database and the frontend, providing necessary data and functionalities.

## Technology Stack
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and Chama data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For user authentication.

## Folder Structure
```
backend/
├── config/               # Configuration files (database, environment variables)
├── controllers/          # Route handlers for API endpoints
├── models/               # Mongoose models for database schemas
├── routes/               # API route definitions
├── middleware/           # Middleware functions (authentication, error handling)
├── utils/                # Utility functions
├── index.js              # Entry point for the backend application
└── package.json          # Project dependencies and scripts
```

## API Endpoints
- **GET /api/chamas**: Fetches the list of Chamas.
- **POST /api/chamas**: Creates a new Chama.
- **GET /api/chamas/:id**: Fetches details of a specific Chama.
- **PUT /api/chamas/:id**: Updates a specific Chama.
- **DELETE /api/chamas/:id**: Deletes a specific Chama.
- **POST /api/users/register**: Registers a new user.
- **POST /api/users/login**: Authenticates a user and returns a token.
- **GET /api/users/:id**: Fetches user profile information.

## Database Schema
### User Model
- **username**: String, required, unique
- **email**: String, required, unique
- **password**: String, required
- **registrationDate**: Date, default to current date
- **profile**: Object containing user profile information

### Chama Model
- **name**: String, required
- **members**: Array of user IDs
- **balance**: Number
- **activities**: Array of activity records
- **createdDate**: Date, default to current date

## Authentication and Authorization
- User registration and login will be handled using JWT for secure authentication.
- Routes will be protected using middleware to ensure that only authenticated users can access certain endpoints.

## Error Handling
- Centralized error handling middleware will be implemented to catch and respond to errors consistently across the application.
- Logging will be set up to track errors and important events.

## Future Enhancements
- Implement additional features such as user roles and permissions.
- Enhance the API with more endpoints as new features are added to the frontend.
- Optimize performance and security measures.

---
This documentation provides a comprehensive overview of the frontend and backend structure, ensuring a well-organized and efficient development process.
