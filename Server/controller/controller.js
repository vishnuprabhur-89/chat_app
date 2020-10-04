const fs = require("fs");
const users = require("../users.json");
const chat = require("../chatdetails.json");

exports.user_details = function (request, response) {
    var status = false;
    users.forEach((ele) => {
        if (ele.username === request.body.username) {
            status = true
        }
    });
    if (!status) {
        users.push(request.body);
    }
    fs.writeFile("users.json", JSON.stringify(users), err => {
        if (err) {
            console.log(err)
        }
        else {
            response.send(request.body)
        }
    });
}

exports.user_role = function (request, response) {
    var status = false;
    users.forEach((ele) => {
        if (ele.username === request.body.username) {
            status = true
        }
    });
    response.send({ message: status })
}

exports.access_details = function (request, response) {
    if (true) {
        response.send(users)
    }
}

exports.chat_user = function (request, response) {
    var status = [];
    chat.forEach((ele) => {
        if (ele.from === request.body.from && ele.to === request.body.to || ele.from === request.body.to && ele.to === request.body.from) {
            status.push(ele)
        }
    });
    if (status) {
        response.send(status);
    }
}

exports.chat_update = function (request, response) {
    chat.push(request.body)
    fs.writeFile("chatdetails.json", JSON.stringify(chat), err => {
        if (err) {
            console.log(err)
        }
        else {
            response.send(request.body);
        }
    });
}

exports.chat_delete = function (request, response) {
    var status = [], status1 = [];
    chat.forEach((ele) => {
        if (ele.from === request.body.from && ele.to === request.body.to || ele.from === request.body.to && ele.to === request.body.from) {
            console.log(true)
        } else {
            status.push(ele)
        }
    });
    fs.writeFile("chatdetails.json", JSON.stringify(status), err => {
        if (err) {
            console.log(err)
        }
        else {
            response.send({ message: "cleared successfully!" });
        }
    });
}

exports.user_delete = function (request, response) {
    var status1 = [];
    users.forEach((ele) => {
        if (ele.username === request.body.to) {
            console.log("true")
        }
        else {
            status1.push(ele)
        }
    });
    fs.writeFile("users.json", JSON.stringify(status1), err => {
        if (err) {
            console.log(err)
        }
        else {
            response.send({ message: "cleared successfully!" });
        }
    });
}
