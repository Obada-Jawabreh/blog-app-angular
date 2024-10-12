# Blog Application

This project is a blog application built with **Angular**, **Node.js**, and **Mongoose**. The application allows users to register, log in, create posts, comment on posts, and view their profiles.

## Features
- **User Registration and Login**: Users can register and log in using their name, email, and password.
- **Post Management**: Users can view previously added posts and create new posts once logged in.
- **Commenting System**: Users can comment on posts and reply to comments.
- **User Profile**: Users can view their profile information, including their email and previously added posts.
- **Protected Routes**: Users must be logged in to access certain routes.

## Nice to Have Features
- **Reactions**: Users can react to posts and comments.

## Technologies Used
- **Frontend**: Angular for building user interfaces.
- **Backend**: Node.js for server-side logic.
- **Database**: Mongoose for MongoDB object modeling.
- **JWT Authentication**: JSON Web Tokens are used for user authentication. The backend verifies tokens through middleware to ensure secure access.
- **MVC Architecture**: The application is organized using the Model-View-Controller architecture for better code organization and separation of concerns.

## Security
Security is a top priority in this application. The following measures have been implemented to ensure the protection of user data and application integrity:

- **Password Hashing**: User passwords are securely hashed using **bcrypt** before being stored in the database. This ensures that even if the database is compromised, user passwords remain secure.
- **JWT Authentication**: The application uses **JSON Web Tokens (JWT)** for user authentication. Tokens are generated upon successful login and stored in cookies. The backend verifies these tokens to authenticate users and protect routes.

## Adjustments for Angular
- **Routing**: Angular Router is used to handle client-side navigation between components, such as home, login, profile, and post pages.
- **Forms**: Angular Reactive Forms or Template-Driven Forms are used for user registration, login, and post creation.
- **Services**: Angular services are used to manage API calls, such as user authentication, post management, and comments.
