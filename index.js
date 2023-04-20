require("dotenv").config();

const express = require('express');
const bot = require('./src/bot');
const { token, port } = require('./src/utils/constants');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

bot(token);

const listener = app.listen(port, () => {
	console.log(`The app started listening at port ${listener.address().port}`);
});