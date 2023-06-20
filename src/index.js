const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiroutes = require("./routes/index");
const app = express();


// const UserRepository=require("./Repository/user-repository");


const UserService=require("./services/user-service");

const prepareAndStartServer = () => {

  app.listen(PORT, async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiroutes);

    /* 
     const repo = new UserRepository();
     const response = await repo.getById(2);
     console.log(response); 
     */


    const userservice=new UserService();
    /* 
    const tokencreation=userservice.createToken({email:"oreo123@gmail.com ",id:4});
    console.log(tokencreation); 
    */

    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9yZW8xMjNAZ21haWwuY29tICIsImlkIjo0LCJpYXQiOjE2ODY4OTg5NzEsImV4cCI6MTY4Njk4NTM3MX0.wZEyZG8jC21O5EW6Zt49vjYBOuVhA2oYG33fbEWaVWA";
    // const tokenverificaton=userservice.verifyToken(token);
    // console.log(tokenverificaton);

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
