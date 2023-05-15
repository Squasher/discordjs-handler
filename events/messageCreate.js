const { PermissionsBitField } = require("discord.js");
const helpEmbed = require("../src/utils/helpEmbed");
const Util = require("../src/utils/Util");

module.exports = {
	name: "messageCreate",
	run(message) {
		const client = message.client;
		const prefix = client.config.prefix;

		if (!message.guild || message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		const clientMember = message.guild.members.resolve(client.user.id);
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = this.commands.find(cmd => (cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName))));

		if (!command) return;

		message.prefix = prefix;

		if (command.ownerOnly && !client.config.ownerIDs.includes(message.author.id)) {
			return;
		}

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

		if (command.cooldownEnabled && Number.isInteger(command.cooldown)) {
			const cooldownKey = `${command.name}-${message.author.id}`;
			if (client.cooldowns.has(cooldownKey)) {
				const endsIn = new Date(client.cooldowns.get(cooldownKey)) - Date.now();
				const timeoutInSeconds = (endsIn / 1000).toFixed(1);
				return message.reply(`⏰ Cooldown ${timeoutInSeconds} Second(s)`).catch(Util.noop);
			} else {
				const cooldownInMS = command.cooldown * 1000;
				client.cooldowns.set(cooldownKey, new Date(Date.now() + cooldownInMS));
				setTimeout(() => client.cooldowns.delete(cooldownKey), cooldownInMS);
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