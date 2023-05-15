require("dotenv").config();

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/bot")().login(process.env.DISCORD_TOKEN);

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`The app started listening at port ${listener.address().port}`);
});