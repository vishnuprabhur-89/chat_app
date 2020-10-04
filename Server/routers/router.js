var express = require("express");
var Router = express.Router();
var Events = require("../controller/controller");

Router.post('/store/user/data', Events.user_details);
Router.get('/access/details', Events.access_details);
Router.post('/chat/detail', Events.chat_user);
Router.post('/chat/update', Events.chat_update);
Router.post('/chat/delete',Events.chat_delete);
Router.post('/user/delete',Events.user_delete);
Router.post('/get/status', Events.user_role);
module.exports = Router;