 
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const styles = require('./assets/css');

  const sequelize = require('./config/connection');

  //Imports the connect-session-seqeulize package (middleware)
 // Session data will be stored in a Seqeulize-managed database.
 Session.store is turning it on
  const SequelizeStore = require('connect-session-sequelize')(session.Store);

 const app = express();
 const PORT = process.env.PORT || 3001;

  const hbs = exphbs.create({ helpers });

  //Configures how session data will be handled and stored 

  const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  //This statement adds the session management functionality to an Express.js app
  app.use(session(sess));

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, 'public')));

  app.use(routes);

 sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening'));
 });