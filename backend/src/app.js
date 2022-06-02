const express = require("express");
const cors = require('cors');
const authorizationRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const booksRouter = require("./routers/booksRouter");

const app = express();

app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use("/main", booksRouter);
app.use("/auth", authorizationRouter);
app.use("/user", userRouter);

app.listen(4000);
