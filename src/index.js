const express = require("express");
const bodyParser=require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiroutes = require("./routes/index");
const app = express();

const prepareAndStartServer = () => {

  app.listen(PORT, () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiroutes);
    console.log(`server started on Port ${PORT}`);
  })
}

prepareAndStartServer();

// const bcrypt = require('bcrypt');

// const password = 'myPassword';
// const saltRounds = 9;

// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(password, salt);

// console.log('Hashed password:', hash);
