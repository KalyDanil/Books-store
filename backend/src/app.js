const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const authorizationRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const booksRouter = require("./routers/booksRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use("/main", booksRouter);
app.use("/auth", authorizationRouter);
app.use("/user", userRouter);

app.listen(4000);