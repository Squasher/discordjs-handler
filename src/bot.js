const { Client } = require("discord.js");
const { client_options } = require("./utils/constants");
const importCommands = require("./utils/importCommands");
const importEvents = require("./utils/importEvents");

module.exports = async function bot(token) {
	const client = new Client(client_options);

	client.commands = importCommands();
	client.events = importEvents();

	client.events.forEach(event => {
		client[event.once ? "once" : "on"](event.name, event.run.bind(client));
	});

	return await client.login(token);
}