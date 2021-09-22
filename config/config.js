require("dotenv").config()
const {DB_HOST,DB_USERNAME,DB_PORT,DATABASE,DB_PASSWORD} = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "weatherMonster_dev",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "weatherMonster_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "weatherMonster_prod",
    "host": DB_HOST,
    "dialect": "postgres"
}
};
