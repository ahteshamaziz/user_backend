const express = require('express')
const routes =  express.Router();
const userController = require('../controllers/user')
var bodyPaser = require('body-parser');
var jsonParser = bodyPaser.json();

routes.post("/updatebyid",jsonParser,userController.updateUserById);
routes.get("/findOne",jsonParser,userController.findOne);
routes.get("/delete",jsonParser,userController.deleteUser);
routes.get("/getUser",jsonParser,userController.getUser);



module.exports = routes;





