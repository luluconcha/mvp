# MVP


## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

### Database Prep

Run `npm run migrate` in your **TERMINAL**, in the **project** folder. This will create two tables called 'politicians' and 'parties' in your database.
Then run `npm run scrap` to populate the tables.

### Run Your Development Servers

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`


#### CREDIT 

- FONTS :
Mom'sTypewriter is copyright Christoph Mueller 1997.
Retro King from dafonts.com