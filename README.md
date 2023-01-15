# Email Guesser

A Single Page Application (SPA) that allows users to input a full name and company domain, and display the derived email address. The SPA is built with React and the backend service is built with Express.js.

## Features

- Form component that accepts the full name and company domain
- ImportButton component that when clicked, sends a request to the backend service to derive the email address
- Result component that displays the derived email address
- Loading component that is displayed while the request is being processed

## Get Started

1. Clone this repository by running git clone https://github.com/btrlpkrms/email-guesser.git
2. Install the dependencies by running npm install in the root folder
3. Start the development server by running npm start
4. Open http://localhost:3000 to view the application in the browser
5. Install the dependencies by running npm install in the backend folder
6. Start the backend server by running npm start

## Running the tests

To run the tests, run npm test in the root folder.

## Deployment

To deploy the application, run npm run build to create a production-ready build of the application. Then, follow the steps for deploying a React application to a hosting service of your choice.

## Built With

- React - The web framework used for the frontend
- Express.js - The web framework used for the backend

## Authors
- Baturalp Karamus

##Additional Notes

- The sample data set used for email address derivation is in a static JSON file, the format of email addresses is either first_name_last_name or first_name_initial_last_name.

Sample Data:
```json
{
"Jane Doe": "jdoe@babbel.com",
"Jay Arun": "jayarun@linkedin.com",
"David Stein": "davidstein@google.com",
"Mat Lee": "matlee@google.com",
"Marta Dahl": "mdahl@babbel.com",
"Vanessa Boom": "vboom@babbel.com"
}
```
## Screenshots

<img width="200" height="200" alt="Screenshot 2023-01-15 at 15 28 36" src="https://user-images.githubusercontent.com/29132727/212564921-732cfd1c-30fb-4fb5-b5c5-8d6e74d75932.png">

