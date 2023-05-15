const { Client, Collection, IntentsBitField, ActivityType } = require("discord.js");
const botConfig = require("../botconfig.json");
const { readdirSync } = require("node:fs");
const { join } = require("node:path");

const COMMANDS_DIR = join(__dirname, "..", "commands");
const EVENTS_DIR = join(__dirname, "..", "events");

module.exports = function createBot () {
	const client = new Client({
		intents: [
			IntentsBitField.Flags.Guilds,
			IntentsBitField.Flags.GuildMessages,
			IntentsBitField.Flags.GuildMembers,
			IntentsBitField.Flags.GuildPresences,
			IntentsBitField.Flags.GuildVoiceStates,
			IntentsBitField.Flags.MessageContent
		],
		allowedMentions: {
			parse: ["users", "roles"]
		},
		presence: {
			status: "online",
			activities: [
				{
					name: `${botConfig.prefix}help`,
					type: ActivityType.Playing
				}
			]
		}
	});

	client.config = botConfig;
	client.cooldowns = new Collection();
	client.commands = new Collection();

	for (let folderName of readdirSync(COMMANDS_DIR)) {
		const filesDir = join(COMMANDS_DIR, folderName);

		for (let fileName of readdirSync(filesDir)) {
			let command = require(join(filesDir, fileName));
			command.category = folderName;
			client.commands.set(command.name, command);
		}
	}

	client.events = new Collection();

	for (let fileName of readdirSync(EVENTS_DIR)) {
		let event = require(join(EVENTS_DIR, fileName));
		client.events.set(event.name, event);
	}

	client.events.forEach(event => {
		client[event.once ? "once" : "on"](event.name, event.run.bind(client));
	});

	return client;
}