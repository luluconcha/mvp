# MVP

This is a student project for Codeop's fullstack bootcamp.

The idea is to create an easy-to-use way for people to reach their representatives. 
It's aimed at young people, the clinically-online kind who flipped Gamestop's stocks. 

For this I used puppeteer, the openAI API, and nodemailer.

![data_schema](data_schema.png)


## Setup


### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

Install puppeteer (follow web instructions, it's easy) and nodemailer (bis).

Rename the `.env.example` just `.env` and add your own data. I am leaving the access keys for OpenAI (MASTER_MAIL, MAIL_PASS, OPENAI_API_KEY). You can use them! There is some credit on the account.

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