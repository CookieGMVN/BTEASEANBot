const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'avatar',
	description: 'Access your avatar and others.',
	execute(message) {
		moment.locale('en')
        const date = moment().format('ll'); 
		if (!message.mentions.users.size) {
			const Avatar = new Discord.MessageEmbed()
			.setColor('#00FFF')
			.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
			.setDescription(`${message.author.username}'s Avatar:`)
			.setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
			.setFooter('Content requested at: ' + date+' GMT +7')
			return message.channel.send(Avatar);
		}

		const avatarList = message.mentions.users.map(user => {
						const Avatar = new Discord.MessageEmbed()
			.setColor('#00FFF')
			.setAuthor(`${user.username}`, `${user.displayAvatarURL({ dynamic: true })}`)
			.setDescription(`${user.username}'s Avatar:`)
			.setImage(`${user.displayAvatarURL({ dynamic: true })}`)
			.setFooter('Content requested at: ' + date+' GMT +7')
			return message.channel.send(Avatar);
		});
	},
};