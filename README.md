# Interview Scheduler

## Project Description

Interview Scheduler is a SPA (Single Page Application) for tracking students interviews built with the latest tools and techniques for optimized user experience.
The App utilizes React built-in and custom hooks and allows users to add, edit and delete appointments in real time.
Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format.
For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project Features

- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- The days show the number of slots available as a snapshot of the week
- A user can switch between days and see detailed information
- Booked and available slots are clearly differentiated
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Days display currently remaining spots and capture updates after each modification
- If error occured during booking or cancelling appointment an appropriate error message will appear accordingly.
- User cannot add an appointment if student name is blank and an appropriate message will show to remind user to fill in name

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## ScreenShots

!['day-selection'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/day-selection.gif?raw=true)
_By selecting a weekday on the left panel, a user can see booked appointments and available slots for each day, and selected day background in changed on selection._

!['book-appointment'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/book-appointment.gif?raw=true)
_A walkthrough of how a user can book an appointment and how the spots is decreased when appointment is booked._

!['cancel-appointment'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/cancel-appointment.gif?raw=true)
_Cancel appointment walkthrough where user hover on appointment, trash icon appear and a confirm message appear on click then appointment cancelled and spots number is increased._

!['edit-appointment'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/edit-appointment.gif?raw=true)
_Edit appointment walkthrough where user hover on appointment, edit icon appear when clicked form shows with current information to be edited._

!['error-message-save'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/error-message-save.jpg?raw=true)
_Error message if save cannot be performed._

!['blank-error'](https://github.com/DrMustafaH/Scheduler/blob/master/docs/blank-error.jpg?raw=true)
_Error message if student name is not entered._

## API server/\*Database Setup

For full functionality both must run concurrently: the client and the API server applications.

- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`
- To view saving and cancel appointment errors run the error server using `npm run error`

## Project Stack

**Front-End:** React, Axios, JSX, HTML, SASS, JavaScript

**Back-End:** Express, Node.js, PostgreSQL

**Testing:** Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
- React-test-renderer
