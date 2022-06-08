const authorizationRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const booksRouter = require("./routers/booksRouter");

module.exports = appRouter = (app) => {
    app.use("/main", booksRouter);
    app.use("/auth", authorizationRouter);
    app.use("/user", userRouter);
};