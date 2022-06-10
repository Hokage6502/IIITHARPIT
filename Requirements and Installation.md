# Publishing Datasets and Versons

## Requirements
- Node
    - Installation: [https://nodejs.org/en/download/package-manager/]()
- Mysql
    - Installation:  [https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/]()
- Database named "dfs" in the mysql server. This database will contain all tables related to the project.

## Directory structure
The project source code is divided into 2 folders.  
1. frontend: This folder contains the source code for the react app which serves as the frontend for the upload portal
2. backend: This folder contains the source code for the express server which serves as the backend for the portal serving endpoints to read from and/or write to the database.

## How to run

Run the backend server and the frontend app in separate terminal instances. It is recomended to start the backend before the frontend

 ### Backend
 1. Navigate to the backend folder: `cd backend`
 2. Make sure mysql service is running (Either on local machne or cloud)
 3. If mysql is not running on local, update the host address in `db.js`
 4. Update mysql user and password config in `db.js`
 5. Install node modules: `npm install`
 6. If running for the first time, create the required database schema in mysql by runnng: `node create_schema.js`. This will create all the necessary tables in the *dfs* database in mysql.
 6. Run the express server: `node index.js`
 7. The express server will be accessible at [http://localhost:4000/]()

 ### Frontend
 1. Navigate to the frontend folder: `cd frontend`
 2. Install node modules: `npm install`
 3. Run the react app: `npm start`
 4. React app will be served on [http://localhost:3000/]()
