const fs = require("fs");
const Discord = require("discord.js");
module.exports = {
  name: "scan",
  aliases: [],
  enabled: false,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  guilOwnerOnly: true,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    const { guild, channel } = message,
    kickData = [],
      banData = [],
      pruneData = [],
      safeData = [];
    guild.roles.cache.forEach(role => {
      if (role.permissions.has("KICK_MEMBERS") && role.permissions.has("BAN_MEMBERS")) {
        pruneData.push(role.id);
      } else if (role.permissions.has("KICK_MEMBERS")) {
        kickData.push(role.id);
      } else if (role.permissions.has()) {
        pruneData.push(role.id);
      } else {
        safeData.push(role.id);
      }
      let x = "Prune ";
      pruneData.forEach(pruneD => {
        x += x + "<@&" + pruneD + ">\n";
      })
      channel.send(x).then(message => {
      let k = "Kick",
      kickData..forEach(kickD => {
        k += k + "<@" + kickD + ">\n";
       })
    })
  }
}
}
