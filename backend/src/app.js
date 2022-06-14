const express = require('express');
const cors = require('cors');
const config = require('./config');
const app = express();
const globalErrHandler = require('./middlewares/globalErrHandler');
const router = require('./routers/index');

app.use(cors({ origin: [config.frontHost] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

router(app);

app.use(globalErrHandler);

module.exports = app;
