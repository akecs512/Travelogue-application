const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require("path");
//not sure we need fs on this page
// const fs = require("fs");

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge:30 * 60 * 1000, 
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(express.static("public"));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// app.listen(PORT, () => {
//   console.log(`Server listening to http://localhost:${PORT}`);
// });