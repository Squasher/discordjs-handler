const { EmbedBuilder } = require("discord.js");
const { default_embed_color } = require("../../src/utils/constants");

module.exports = {
    name: "ping",
    description: "checks the bot's latency.",
    aliases: ["pong", "latency", "speed"],
    usages: [""],
    botPermissions: ["EmbedLinks"],
    async execute (message, [], client) {
        let websocket = `${client.ws.ping}ms`,
            now = Date.now(),
            pongMessage = await message.reply(`Pong!`),
            discordAPI = `${Date.now() - now}ms`;

        pongMessage.edit({
            content: "",
            embeds: [
                new EmbedBuilder()
                .setColor(default_embed_color)
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setDescription(`📊 Discord API: ${discordAPI}\n:stopwatch: Web Socket: ${websocket}`)
            ]
        });
    }
}