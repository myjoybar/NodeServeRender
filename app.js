const path = require("path");
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const inviteRouter = require("./routes/invite");

app.set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(express.static(path.join(__dirname, 'public')))
    .use("/", indexRouter)
    .use("/user", usersRouter)
    .use("/invite", inviteRouter)
    .listen(8089, "127.0.0.1");