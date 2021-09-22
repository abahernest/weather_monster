# Weather Monster

## Description

A Node.js API that that performs CRUD Operations, particularly creation of cities, temperatures, forcasts and webhooks.
Basically Its an API for storing and retreiving temperature of cities.

## Project SetUp

* Ensure postgres is installed
* Populate the .env file with the postgres credentials
* Run the following code

```bash
git clone https://github.com/abahernest/weather_monster.git
cd weather_monster
npm install
npx sequelize db:migrate  //this transfers the db schema to your postgres db
npm run dev   // this runs the app with nodemon you can use npm start instead
```

## Test

```bash
npm run test
```
PS: Due to slight errors with sequelize-cli and dotenv node modules not working together perfectly (Sequelize is unable to see the environment file), Some tests might fail

## Postman Documentation

[Weather Monster Postman Doc](https://documenter.getpostman.com/view/11044390/UUxwBUSm)
