const { PermissionsBitField } = require("discord.js");
const { prefix } = require("../src/utils/constants");
const helpEmbed = require("../src/utils/helpEmbed");
const Util = require("../src/utils/Util");

module.exports = {
	name: "messageCreate",
	run(message) {
		if (!message.guild || message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		const client = message.client;
		const clientMember = message.guild.members.resolve(client.user.id);
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = this.commands.find(cmd => (cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName))));

		if (!command) return;

		message.prefix = prefix;

		if (message.author.id !== message.guild.ownerId) {
			const permissionsFor = message.channel.permissionsFor(message.member);
			if (command.permissions && !permissionsFor.has(command.permissions)) {
				return;
			}
		}

		if (message.client.user.id !== message.guild.ownerId) {
			if (!message.channel.permissionsFor(clientMember).has(PermissionsBitField.Flags.SendMessages)) {
				return message.author.send(`❌ I can't send messages in <#${message.channel.id}>.`).catch(Util.noop);
			}
		}

		const permissionsFor = message.channel.permissionsFor(clientMember);
		if (!permissionsFor.has(command.botPermissions)) {
			return message.reply(`❌ This command needs the following permissions: ${command.botPermissions.filter(x => !permissionsFor.has(x)).join(", ")}.`);
		}

		if (command.argsRequired && !args.length) {
			return message.reply({ embeds: [helpEmbed(command, message)] });
		}

		try {
			command.execute(message, args, client, Util);
		} catch (error) {
			console.error(error);
			return message.reply("❌ An error occurred while executing this command!");
		}
	}
}