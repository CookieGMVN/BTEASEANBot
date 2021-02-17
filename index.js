//BTE ASEAN Bot
//A Discord bot for BTE ASEAN
//Made by CookieGMVN#9173
//All rights reversed. Published due to CC 1.0.

const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment');
const { token, prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection(); 

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
console.log('Logged!');
  console.log('Loaded 16 built-in plugins, 0 external plugin.')
  console.log('Prefix is ' + prefix)
  client.user.setActivity("Server IP: asean.my.to || Prefix: bte", {
  type: "PLAYING",
});
})

client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot) return;		
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

  	if (message.content === `${prefix}restart`) {
  		if(`${message.author}` === '<@'+admin+'>' || `${message.author}` === '<@!'+admin+'>'){
message.channel.send('Restarting...').then(m => {
        client.destroy();
          client.login(token);
          console.log('Restarted!')
          client.emit('ready');
      });
  		}
  		else{
  			message.channel.send("You don't have enough permissons!")
  		}
}

if (message.content === `${prefix}shutdown`){
  		if(`${message.author}` === '<@'+admin+'>' || `${message.author}` === '<@!'+admin+'>'){
  			message.channel.send('Đang tắt...').then(m => {
        client.destroy();
        console.log('Bot offline!')
      });
  			}
  			else{
  				message.channel.send("You don't have enough permissons!")
	}
	}

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`You have to wait ${timeLeft.toFixed(1)} seconds before reuse \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('A error happened. Please contact to owner!');
	}
});

client.login(token);