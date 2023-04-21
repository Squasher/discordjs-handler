const { IntentsBitField, ActivityType } = require("discord.js");
const { join } = require("path");

const commandsPrefix = "!";

module.exports = {
	prefix: commandsPrefix,
	default_embed_color: 0x0069ff,
	token: process.env.DISCORD_TOKEN,
	port: 3000,
	client_options: {
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
					name: `${commandsPrefix}help`,
					type: ActivityType.Playing
				}
			]
		}
	},
	commands_dir: join(__dirname, "../../commands"),
	events_dir: join(__dirname, "../../events"),
}
