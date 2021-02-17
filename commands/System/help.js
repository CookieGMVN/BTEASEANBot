const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'help',
	description: 'Help command.',
	execute(message, args){
		moment.locale('en')
        const date = moment().format('ll'); 
		if(!args[0]){
			const ErrorHelp = new Discord.MessageEmbed()
			.setColor("RED")
			.setTitle('Error!')
			.setTitle(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
			.setDescription('Missing topic.')
			.addFields(
				{ name: 'Topic avaliable:', value: 'general' }
				)
			.setFooter('Content requested at: '+date+' GMT +7')
			message.channel.send(ErrorHelp)
		}
		if(args.length > 1){
			message.channel.send('Too much arguments!')
		}
		if(args[0] === 'general' || args[0] === 'General'){
			const GeneralHelp = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle("BTE ASEAN BOT HELP")
			.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
			.addFields(
				{ name: 'Prefix', value: 'bte' },
				{ name: 'Commands', value: 'help\navatar\nrule\nip\nhowtojoin'}
				)
			.setFooter('Content requested at: '+date+' GMT +7')
			message.channel.send(GeneralHelp)
			}
		}
	}