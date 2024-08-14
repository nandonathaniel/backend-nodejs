# README

To get started with this project, follow the steps below:

1. Install the required dependencies by running the following command:
    ```
    npm install
    ```

2. Start the application by running the following command:
    ```
    npm run start
    ```

Once the application is up and running, you can access the following APIs:

- API 1: [Get All Users](http://localhost:3000/api/users) - Retrieves a list of all users.
  - Method: GET
  - Response:
     ```json
     [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "dateOfBirth": "1990-01-01"
        },
        ...
     ]
     ```

- API 2: [Get User by ID](http://localhost:3000/api/users/:id) - Retrieves a single user by their ID.
  - Method: GET
  - Response:
     ```json
     {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "dateOfBirth": "1990-01-01"
     }
     ```

- API 3: [Create a New User](http://localhost:3000/api/users) - Creates a new user.
  - Method: POST
  - Request Body:
     ```json
     {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "dateOfBirth": "1992-05-15"
     }
     ```
  - Response:
     ```json
     {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "dateOfBirth": "1992-05-15"
     }
     ```

- API 4: [Update a User](http://localhost:3000/api/users/:id) - Updates an existing user's information.
  - Method: PATCH
  - Request Body:
     ```json
     {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "dateOfBirth": "1992-05-15"
     }
     ```
  - Response:
     ```json
     {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "dateOfBirth": "1992-05-15T00:00:00.000Z"
     }
     ```

- API 5: [Delete a User](http://localhost:3000/api/users/:id) - Deletes a user by their ID.
  - Method: DELETE
  - Response:
     ```json
     {
        "message": "Delete successful"
     }
     ```