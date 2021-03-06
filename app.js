const path = require("path");
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const inviteRouter = require("./routes/invite");
var config = require('./public/javascripts/Config');
app.set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(express.static(path.join(__dirname, 'public')))
    .use("/", indexRouter)
    .use("/user", usersRouter)
    .use("/invite", inviteRouter)
    .listen(8089, "127.0.0.1");

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
//
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });



module.exports = app;
