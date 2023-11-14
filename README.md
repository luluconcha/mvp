# MVP

This is a student project for Codeop's fullstack bootcamp.

The idea is to create an easy-to-use way for people to reach their representatives. 
It's aimed at young people, the clinically-online kind who flipped Gamestop's stocks. 

For this I used puppeteer, the openAI API, and nodemailer (on top of React and Javascript).

There is one main endpoint, where the user clicks on a crystal ball and receives a message OpenAi-GPT created based on:
the politician's party official webpage (or the most official webpage I could find) and the theme the user chose (so far either climate change, social policies or housing issues). There is a suggestions database, because why not. 

<img src="data_schema.png" alt="data flow"/>

## Setup


### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

Install `puppeteer` and `nodemailer`.

Rename the `.env.example` just `.env` and add your own data. Contact me for the OpenAI account.
I tried to leave the API key in the exaple, but OpenAI disabled it because it was on github (which, thinking about it, makes sense).

Use another email account to receive/send test emails and enable a SMTP connection. 

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