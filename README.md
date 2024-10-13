# Flashcard Learning Web Application

This is the frontend for a flashcard learning web application built with React and Redux. It provides an interactive interface for users to create, study, and manage flashcards and topics.

## Features

- User authentication (login, register, logout)
- Dashboard for user's personal content
- Public library of flashcard sets
- Creation and management of flashcard sets
- Topic-based organization of flashcards
- Study view for learning with flashcards
- Static pages (About, Privacy Policy, Terms of Service)

## Technologies Used

- React.js
- Redux for state management
- React Router for navigation
- React Hook Form for form management
- Material-UI or similar for UI components
- Axios for API requests

## Project Structure

The application is organized into several main components:

- Authentication pages (Login, Register, Logout)
- Dashboard for authenticated users
- Library for browsing public flashcard sets
- Create and Update pages for flashcard sets
- Topic Dashboard for topic-specific content
- Study View for active learning sessions
- Static information pages

## Routes

<details>
<summary>Public Routes</summary>

- `/login`: User login page
- `/register`: New user registration
- `/logout`: User logout functionality
- `/library`: Browse public flashcard sets
- `/create`: Create new flashcard sets
- `/topic/:id`: View topic-specific dashboard
- `/collection/:id`: Study view for a specific flashcard set
- `/collection/:id/update`: Update a specific flashcard set
- `/terms`, `/about`, `/privacy`: Static information pages

</details>

<details>
<summary>Protected Routes</summary>

- `/dashboard`: User's personal dashboard (requires authentication)

</details>

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file
4. Start the development server: `npm start`

## Environment Variables

- `REACT_APP_BACKEND_IP`: IP of the backend API
- `REACT_APP_BACKEND_PORT`: IP of the backend API
- `REACT_APP_NAME`: Name of the application

## State Management

The application uses Redux for state management. Key states include:
- User authentication state
- Current flashcard set data

## API Integration

The frontend interacts with a backend API for data persistence and retrieval. Ensure the API URL is correctly set in the environment variables.

## Responsive Design

The application is designed to be responsive and work across desktop and mobile devices.

