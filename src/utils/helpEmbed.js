const { EmbedBuilder } = require("discord.js");
const { default_embed_color } = require("./constants");

module.exports = function helpEmbed (command, message) {
  const embed = new EmbedBuilder()
  .setColor(default_embed_color);

  command.name && embed.setTitle(`Command ${command.name}`);
  command.description && embed.setDescription(command.description);
  command.aliases && embed.addFields({ name: "Aliases:", value: command.aliases.map((x) => message.prefix + x).join(", ") });
  command.usages && embed.addFields({ name: "Usages:", value: command.usages.map((x) => message.prefix + command.name + " " + x).join("\n") });
  command.examples && embed.addFields({ name: "Examples:", value: command.examples.map((x) => message.prefix + command.name + " " + x.replace(/@(user)/g, message.author.toString())).join("\n") });

  return embed;
}