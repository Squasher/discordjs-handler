const { EmbedBuilder } = require("discord.js");
const helpEmbed = require("../../src/utils/helpEmbed");

module.exports = {
  name: "help",
  description: "displays a list of available commands",
  usages: ["(command name)"],
  cooldownEnabled: true,
  cooldown: 15,
  examples: ["", "clear"],
  botPermissions: ["EmbedLinks"],
  execute (message, [commandName], client, util) {
    const commandsList = client.commands.map(cmd => cmd);
    
    if (commandName) {
      const command = commandsList.find(cmd => cmd.name === commandName.toLowerCase() || (cmd.aliases && cmd.aliases.includes(commandName.toLowerCase())));
      if (!command) {
        return message.reply(`❌ I can't find this command!`);
      }
      return message.reply({ embeds: [helpEmbed(command, message)] });
    }

    const embed = new EmbedBuilder()
    .setColor(client.config.embedColor)
    .setTitle("Commands List")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`To display information about a particular command, I use the following command \`${message.prefix}help (command name)\``)
    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    for (let category of util.removeRepeatedElements(commandsList.map(x => x.category))) {
      embed.addFields({
        name: `${util.toCapitalize(category)} Commands`,
        value: commandsList.filter(e => e.category === category).map(x => `\`${message.prefix + x.name}\``).join(", "),
        inline: false
      });
    }

    message.reply({ embeds: [embed] });
  }
}