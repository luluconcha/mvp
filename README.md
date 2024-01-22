# MVP

This is a student project for Codeop's fullstack bootcamp.

The idea is to create an easy-to-use way for people to reach their representatives. 
It's aimed at young people, the clinically-online kind who flipped Gamestop's stocks. 

For this I used puppeteer, the openAI API, and nodemailer (on top of React and Javascript).

There is one main endpoint, where the user clicks on a crystal ball and receives a message OpenAI-GPT created based on:
the politician's party official webpage (or the most official webpage I could find) and the theme the user chose (so far either climate change, social policies or housing issues). Here is a schema to try to explain data flow:

<img src="./client/public/data_schema.png" alt="data flow"/>


## Setup 

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` install dependencies related to React (the client).

Install `puppeteer` and `nodemailer` (see web for instructions).

Rename the `.env.example` just `.env` and add your own data. Contact me for the OpenAI account.
I tried to leave the API key in the env.example, but OpenAI disabled it because it was on github (which, thinking about it, makes sense).

Use another email account to receive/send test emails and enable a SMTP connection. 


### Database Prep

Run `npm run migrate` in your **TERMINAL**, in the **project** folder. This will create two tables called 'politicians' and 'parties' in your database.
**Then run `npm run scrap` to populate the tables.
(If you want to see the pages open, change headless to true in both functions. You will get a headless deprecation warning, which sounds macabre... ignore it.) BE AWARE it is SLOW. It should print 'Connected!' a bunch of times. As long as it doesn't give an error, you should be good to go.


### Run Your Development Servers

- ****** VERY IMPORTANT**** When you are testing out the code, comment out the whole try/catch part of the createMailWithParams(magic) function in index.js. The two commented lines above can be used for testing. 
****** IF YOU DO NOT DO THIS you will spend tokens everytime you save. Guess how I found out*********

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:5173`
- You can test your API in `http://localhost:4000/api`


### Thoughts on feature extensions
- I think the user could give more input (give its email address to receive a copy, choose a politician?)
- I would have liked to create a user page, where they'd accumulate points (a la Neopets)
- I found out this existed at the last minute: https://api.quehacenlosdiputados.es/
- I think there could be more magic churchy things but maybe that's just me

#### CREDIT 

- FONTS :
1. Mom'sTypewriter is copyright Christoph Mueller 1997.
2. Retro King from dafonts.com
