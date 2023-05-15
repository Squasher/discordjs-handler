const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	description: "checks the bot's latency.",
	aliases: ["pong", "latency", "speed"],
	cooldownEnabled: true,
	cooldown: 10,
	usages: [""],
	botPermissions: ["EmbedLinks"],
	async execute(message, [], client) {
		let websocket = `${client.ws.ping}ms`,
			now = Date.now(),
			pongMessage = await message.reply(`Pong!`),
			discordAPI = `${Date.now() - now}ms`;

		pongMessage.edit({
			content: "",
			embeds: [
				new EmbedBuilder()
					.setColor(client.config.embedColor)
					.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
					.setDescription(`📊 Discord API: ${discordAPI}\n:stopwatch: Web Socket: ${websocket}`)
			]
		});
	}
}