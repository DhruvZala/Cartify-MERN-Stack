# Cartify - MERN Stack E-Commerce Platform

Cartify is a modern e-commerce platform built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a seamless shopping experience with features like product browsing, cart management, user authentication, and secure payments.

## Features

- 🛍️ **Product Management**
  - Browse products with categories and filters
  - Detailed product views with images and descriptions
  - Search functionality
  - Product reviews and ratings

- 🛒 **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Save cart for later
  - Real-time price calculations

- 👤 **User Authentication**
  - Secure user registration and login
  - Profile management
  - Order history
  - Wishlist functionality

- 💳 **Payment Integration**
  - Secure checkout process
  - Multiple payment methods
  - Order confirmation
  - Invoice generation

## Tech Stack

- **Frontend**
  - React.js
  - Redux for state management
  - Material-UI for components
  - Axios for API calls

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

- **Development Tools**
  - Git for version control
  - npm for package management
  - ESLint for code linting
  - Prettier for code formatting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

## Installation

1. Clone the repository
```bash
git clone https://github.com/DhruvZala/Cartify-MERN-Stack.git
cd Cartify-MERN-Stack
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment Setup
   - Create `.env` file in the backend directory
   - Add the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://dhruvlaptop11:Dhruvzala@2001@user-data.v76f8hf.mongodb.net/?retryWrites=true&w=majority&appName=User-Data
   JWT_SECRET=cartifySecret
   ```

4. Start the development servers
```bash
# From the root directory
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
cartify-mern/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
├── backend/               # Node.js backend application
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
│
└── package.json         # Root package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Dhruv Zala - [@DhruvZala](https://github.com/DhruvZala)

Project Link: [https://github.com/DhruvZala/Cartify-MERN-Stack](https://github.com/DhruvZala/Cartify-MERN-Stack) 