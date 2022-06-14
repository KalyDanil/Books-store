const authorizationRouter = require('./authRouter');
const booksRouter = require('./booksRouter');
const userRouter = require('./userRouter');

module.exports = router = (app) => {
  app.use('/main', booksRouter);
  app.use('/auth', authorizationRouter);
  app.use('/user', userRouter);
};