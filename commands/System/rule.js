const Discord = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'rule',
	description: 'Rule',
	execute(message, args){
		moment.locale('en')
        const date = moment().format('ll'); 
        if(args.length > 1){
        	return message.channel.send('Too much arguments!')
        }
		else if(!args[0]){
			const RuleGeneral = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
			.setTitle('BTE ASEAN Rule')
			.addFields(
				{ name: 'Rule #1', value: 'Being nice to others.\nAll forms of Racism, Sexism, Homophobia and other forms are prohibited. This can lead to heavy punishment.' },
				{ name: 'Rule #2', value: 'No NSFW (Not Safe For Work).\nSexual contents are banned here including texts, images, links, even voice chat!' },
				{ name: 'Rule #3', value: 'Follow Discord’s Terms of Services (TOS).\nhttps://discord.com/terms' },
				{ name: 'Rule #4', value: 'No spamming and randomly pinging someone.' },
				{ name: 'Rule #5', value: 'No talking about heavy politics or any other heavy topics.\nWe don’t allow any heavy topics in this server. Punishment will be used if you discuss about them.' }
				)
			.setFooter('Content requested at: '+date+' GMT +7')
			message.channel.send(RuleGeneral)
			}
		}
	}