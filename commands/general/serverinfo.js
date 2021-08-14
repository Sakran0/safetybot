const Discord = require("discord.js");
const { Color } = require("../../config.js");
const { MessageEmbed } = require('discord.js');

const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};

module.exports = {
  name: "serverinfo",
  aliases: ["server"],
  description: "Get more information about your server",
  usage: ["s!serverinfo"],
  category: ["General"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev, data) => {

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

                const prime = await Prime.findOne({Guild: message.guild.id})
                const premium = prime.prime
       
		const members = message.guild.members.cache;

	        let guild = await Guild.findOne({ guildID: message.guild.id });
		
	        const channels = message.guild.channels.cache;

		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
                       .setTitle(bot.reva.get(data.lang, "general","guild_info"))

			.setColor(Color)

			.setThumbnail(message.guild.iconURL({ dynamic: true }))

			.addField('**General**', [

				`Name\n${message.guild.name}`,

				`ID\n${message.guild.id}`,

				`Owner\n${message.guild.owner.user.tag} (${message.guild.ownerID})`,

				`Region\n${regions[message.guild.region]}`,

		        	`Explicit Filter\n${filterLevels[message.guild.explicitContentFilter]}`,

				`Verification Level\n${verificationLevels[message.guild.verificationLevel]}`,

				`Time Created\n${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,

				`Role Count\n${roles.length}`,

				`Boost Count\n ${message.guild.premiumSubscriptionCount || '0'}`,

				`Member Count\n${message.guild.memberCount}`,

				`Bots\n${members.filter(member => member.user.bot).size}`,

				`Text Channels\n${channels.filter(channel => channel.type === 'text').size}`,

				`Voice Channels\n${channels.filter(channel => channel.type === 'voice').size}`,

                                `Emoji Count\n${emojis.size}`,
                                 
                                `Server Premium\n${premium || "Normal"}`,
				
				''
			])


		return message.lineReplyNoMention(embed);

	}

};
