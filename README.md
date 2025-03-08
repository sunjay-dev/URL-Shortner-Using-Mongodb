# URL Shortener Using Mongodb

A simple URL shortener built with Node.js and Express.js that stores shortened URLs in MongoDB. This project allows users to create short URLs and redirect to the original URLs.

## Features

- Shorten long URLs and access them using a shorter link.
- Store and manage URL mappings in MongoDB.
- Track click statistics and visit history.
- Enhanced Error handling.

## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) 
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
- Express + Node.js
- shortid (For creating short id for url)
- Mongoose (For Storage)
- Ejs (For Frontend)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sunjay-dev/URL-Shortner-Using-Mongodb
   cd URL-Shortner-Using-Mongodb
   npm install

2. Set up environment variables in a `.env` file (see below).
3. Run the server:
   ```bash
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=9000
JWT_SECRET=JWT_SECRET
mongoUri=MONGODB_URL
GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL=http://localhost:9000/user/auth/github/callback
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:9000/user/auth/google/callback
```

## Routes

The application provides the following routes:

### GET `/shortid`
- **Description**: Handles requests to the shortened URL and redirects to the original URL.
- **Parameters**:
  - `shortId`: The short ID of the URL to redirect.
- **Response**:
  - On success, redirects to the original URL.
  - If the short ID does not exist, returns a 404 error.
  
### POST `/`
- **Description**: Creates a new shortened URL.
- **Request Body**:
  - `url`: The original URL to be shortened.
- **Response**:
  - Returns a JSON object containing the shortened URL.

### POST `/custom`
- **Description**: Creates a new shortened URL with a custom alias.
- **Request Body**:
  - `url`: The original URL to be shortened.
  - `custom`: The custom alias for the shortened URL.
- **Response**:
  - Returns a JSON object containing the shortened URL with the custom alias.
  - If the custom alias is already in use, returns an 409 error message.

### GET `/api/details?url=shortId`
- **Description**: Provides details about shortened url.
- **Parameters**:
  - `shortId`: The short ID of the URL to retrieve.
- **Response**:
  - On success, returns a JSON object containing number of click, original url, and array of lastOpened times.
  - If the short ID does not exist, returns a 404 error.




## Contributing
Feel free to submit issues or pull requests if you have suggestions for improvements.
