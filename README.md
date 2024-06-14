# Industrial Project Management

This project is a web application for user authentication and registration for proposing projects and submitting proposals on them.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

This project provides a user authentication system that allows users to register, sign in, and access role-specific features based on their role (e.g., student, committee member, society member, company). It also includes a registration form for new users to create an account.
The society members or FYP committee mentors will be able to approve and categories their projects. They should be able to request companies to register and suggest projects the companies would like students to work on.

Once a company suggests any project, the members/mentors should be able to categorize and approve the projects.

The students should be able to view the approved projects and Submit their proposals. The submitted proposals can be reviewed and approved by the company.

## Features

- User registration with username, email, password, and role selection (student, committee member, society member, company).
- User login with email and password.
- Role-based redirection to different dashboard pages upon successful login.
- Implements Micro-services architechture and Proxy server
- For Authentication, JWT tokens and Firebase is used.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install` in `cd backend`,`cd backend\projects`, `cd backend\proposals`,`cd backend\user` and `cd frontend`
 

## Usage

To start the application, run the following command:

```bash
cd backend
node server.js
cd backend\projects
node server.js
cd backend\proposals
node server.js
cd backend\user
node server.js
cd frontend\my-app
npm start
