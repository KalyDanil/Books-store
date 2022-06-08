const express = require("express");
const cors = require('cors');

module.exports = appUse = (app) => {
    app.use(cors({ origin: ['http://localhost:3000'] }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
};
