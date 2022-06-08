const express = require("express");
const config = require("./config");
const app = express();
const appRouter = require('./appRouter');
const appUse = require('./appUse');

appUse(app);

appRouter(app);

app.listen(config.port);

