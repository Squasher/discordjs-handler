const { EmbedBuilder, ChannelType } = require("discord.js");
const { default_embed_color } = require("../../src/utils/constants");

module.exports = {
  name: "serverinfo",
  description: "displays information about the server",
  aliases: ["server"],
  usages: [""],
  botPermissions: ["EmbedLinks"],
  async execute (message, args, client, util) {
    const guild = message.guild;
    const author = message.author;
    const guildMembers = await guild.members.fetch();
    const filterChannels = (...types) => guild.channels.cache.filter(c => types.includes(c.type));
    const embed = new EmbedBuilder()
    .setColor(default_embed_color)
    .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL() })
    .addFields({ name: "🆔 Server ID:", value: guild.id, inline: true })
    .addFields({ name: "📅 Created On:", value: `<t:${Math.round(guild.createdTimestamp / 1000)}:R>`, inline: true })
    .addFields({ name: "👑 Owned By:", value: `<@${message.author.id}>`, inline: true })
    .addFields({ name: `👥 Members (${guild.memberCount})`, value: `**${guildMembers.filter(m => !["offline", "invisible"].includes(m.presence.status)).size}** Online\n**${guild.premiumSubscriptionCount}** Boosts`, inline: true })
    .addFields({ name: `:speech_balloon: Channels (${guild.channels.cache.size})`, value: `**${filterChannels(ChannelType.GuildText, ChannelType.GuildAnnouncement).size}** Text | **${filterChannels(ChannelType.GuildVoice, ChannelType.GuildForum, ChannelType.GuildStageVoice).size}** Voice`, inline: true })

    message.reply({ embeds: [embed] }).catch(util.noop);
  }
}