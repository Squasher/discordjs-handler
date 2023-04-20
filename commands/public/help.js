const { EmbedBuilder } = require("discord.js");
const helpEmbed = require("../../src/utils/helpEmbed");
const { default_embed_color } = require("../../src/utils/constants");

module.exports = {
  name: "help",
  description: "displays a list of available commands",
  usages: ["(command name)"],
  examples: ["", "clear"],
  botPermissions: ["EmbedLinks"],
  execute (message, args, client, util) {
    const commandsList = client.commands.map(cmd => cmd);
    
    if (args[0]) {
      const command = commandsList.find(cmd => cmd.name === args[0].toLowerCase() || (cmd.aliases && cmd.aliases.includes(args[0].toLowerCase())));
      if (!command) {
        return message.reply(`❌ I can't find this command!`);
      }
      return message.reply({ embeds: [helpEmbed(command, message)] });
    }

    const embed = new EmbedBuilder()
    .setColor(default_embed_color)
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