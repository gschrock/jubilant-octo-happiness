# Concept3D Interview: The TypeScript Technical Challenge

## Overview

Hello prospective candidate! In this repo, you're given a boilerplate application that contains most of the libraries you'll need to complete the challenge. It's intended to examine your abilities in the following areas:

1. TypeScript and React knowledge
2. General self-ownership of code in order to solve a problem
3. Comfort diving into the docs in order to learn new technologies
4. Ability to write clean, well organized, and refactored code
5. Git usage and best practices

### Instructions

Requirements: Docker and Docker Compose

1. Clone this repo to your own machine (do not fork it)
2. Delete the `.git` directory
3. Initialize git. Host this project as a new repo on your own Github profile
4. Run `docker-compose up -d` to start all services
5. Run Migration Script
6. Visit [http://localhost:5173](http://localhost:5173)
7. Good luck!

> We rely heavily upon Git. Be sure to create new branches for new features, as if you're creating a pull request. Commit early and commit often.

### Overview

This repository is a simple student information management system built with React, TypeScript, and Node.js. 
The application currently has a basic form with a single input field for student names. 
Your task is to enhance this system with additional functionality and fields.

### Requirements

The app currently has a form with one input field for student names. 
We want to expand this to include more student information and improve the overall functionality.

Required Fields to Add:
* Email address
* Graduation year
* Phone number
* GPA

Optional Bonus Fields:
* City
* State
* Location (latitude, longitude)

Notes:
* All new fields should be properly validated
* The form should handle both creation and editing of student records
* Implement proper error handling and user feedback
* Use TypeScript interfaces for type safety
* The list view should display all student information clearly

**Bonus:** Consider adding additional features like:
* Sorting and filtering capabilities
* Search functionality
* Data visualization of student statistics
* Export functionality for student data

### Technical Stack
- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express + TypeScript
- Database: MySQL
- Migrations/Queries: Knex.js
- Containerization: Docker & Docker Compose

### What We'll Look For During Review

#### Code Organization & Architecture
* Frontend:
  - How well components are organized and reused
  - Use of modern React patterns (hooks, context, etc.)
  - Implementation of proper loading and error states
  - Data fetching strategy and caching approach
  - Component hierarchy and separation of concerns

* Backend:
  - API structure and organization
  - Separation of concerns (controllers, services, scope)
  - Middleware implementation
  - Error handling and logging
  - Configuration management

#### Technical Implementation
* TypeScript usage and type safety
* Code quality and readability
* Error handling and validation
* Performance considerations
* Testing approach (if any)

#### Development Process
* Git workflow and commit history
* Code organization and documentation
* Problem-solving approach
* Attention to detail

### Helpful Links:
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Knex.js Documentation](https://knexjs.org/)
- [Express Documentation](https://expressjs.com/)

### Final notes:

Take as long as you need to do your best work. 
However, this challenge should realistically take no longer than approximately 3-4 hours.

Have fun!
