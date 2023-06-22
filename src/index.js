const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");

const apiroutes = require("./routes/index");
const app = express();

const db=require("./models/index")
const {user,Role}=require("./models/index");


const prepareAndStartServer = () => {

  app.listen(PORT, async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiroutes);

    
    if(process.env.DB_SYNC){
      db.sequelize.sync({alter:true})
    }
    // const User=await user.findByPk(1);
    // const role=await Role.findByPk(1);
    //  User.addRole(role);
    

    console.log(`server started on Port ${PORT}`);
  })
}

prepareAndStartServer();


