
## Project Documentation

### Running the Project

I recommend using pnpm, but npm also works.

#### Running the Backend Server

In a command line, navigate to the `server` folder and run:
`pnpm install`
`pnpm start`

This will start the backend server.

#### Running the React Application
Navigate to the root folder and run:
`pnpm install`
`pnpm dev`

This will start the React application.

#### Running the Tests

##### Running Unit Tests
To run the unit tests, execute:
`pnpm test`

##### Running End-to-End Tests
To run the end-to-end tests, navigate to the `e2e` folder and run:
`pnpm install`
`pnpm cypress run`

With these steps, you should be able to set up and run the project, as well as execute both unit and end-to-end tests.



### Introduction
Project: Uru Todo List
A simple task management application.

### Stage 1:
I decided to structure the project in a way that I believe is optimal for both small and large projects. I follow the Feature-Driven pattern, where the file structure is created from the perspective of functionalities, not layers.

In this case, the basic structure consists of:
- `todos/` - Related to the task functionality, marking as complete, etc.
- `shared/` - What is shared between different functionalities.

There isn't much to say about this stage since we simply used local state.

### Stage 2:
Here I added a global Provider for the application responsible for actions and state. The provider is as basic as possible, with a simple and standard reducer, and the data is managed only in memory.

I added the functionality for lists and some main tests to help me during development. The Router added is also standard, but I preferred to make all routes Lazy Loaded from the start, as it is a simple practice with a significant benefit in the initial load time of the application.

### Stage 3:
I decided to create my own mock server using a simple Node with Express. I exposed a REST API that stores data in a file called `lists.json`.

I created my own implementation of a class to make requests because I know this can be very useful in the future if we need to manage headers or interceptors.

Since everything was already done based on hooks from the beginning, the integration of the service layer with the app was practically transparent, with only the Provider receiving changes.

### Stage 4:
With more freedom to work, I decided to remove the provider completely and opted not to use Redux or Zustand. Although I have worked a lot with Redux, I believe that React-Query is an extremely recommended solution for almost any type of situation. It automatically handles caching and states of asynchronous functions, thus greatly simplifying the logic of mutations and data fetching.

I added all unit tests with Vitest and React Testing Library. I decided to use Vitest because it is considerably faster than Jest.

Additionally, I used Cypress for end-to-end testing, which is in a specific folder due to some conflicts with the main project's configuration (this does not cause any issues).

I also decided to have CI/CD pipelines integrated with GitHub Actions, where unit tests and e2e tests are run in parallel, and if successful, the app is built and then deployed to my GitHub Pages (which requires the local server to be open to work).
