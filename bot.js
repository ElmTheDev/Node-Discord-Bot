
const Eris = require("eris");
const CONFIG = require("./config/main.json");
const fs = require("fs");

let commandManager = require("./modules/commandManager.js");
let fileExtension = require("./modules/fileExtensions.js");

let lastUpdate = "February 27th, 2018";

var bot = new Eris(CONFIG.token);

let botCommands = {};

bot.on("ready", () => 
{
	let fetchedCommands = fileExtension.fetchCommands("./commands", "js", fs);
	botCommands = commandManager.loadCommands(fetchedCommands);
	console.log("Bot is ready.")
});

bot.on("messageCreate", (msg) => 
{
	if(msg.channel.type == 1) return;
	
	let commandPrefix = "c!";
	let serverPrefix  = "en-us";
	
	if(msg.content.startsWith(commandPrefix))
	{
		let commandName = msg.content.split(" ")[0].substring(commandPrefix.length);
		let suffix = msg.content.substring(commandName.length + commandPrefix.length + 1);
		let hasPermission = true;

		if(commandName == "help")
		{
			let helpCommands = [];
	
			for(var cmd in botCommands) 
			{
				let temporaryField = {};

				if(cmd.hidden) continue;
				if(cmd.usage)
				{
					temporaryField.name = `${commandPrefix+cmd} (Usage: ${cmd.usage})`
				} else {
					temporaryField.name = commandPrefix+cmd;
				}
				temporaryField.value = "Temporary description"; // TODO: Add actual description

				helpCommands.push(temporaryField);
			}

			bot.getDMChannel(msg.author.id).then(privateChannel => 
			{
				bot.createMessage(privateChannel.id, 
				{
					content: '',
					embed: {
						color: 8071130,
						title: 'Discord Bot Help\n',
						description: '',
						fields: helpCommands,
						footer: {
							text: `Last update was ${lastUpdate}`
						}
					}
				});
			});
			bot.createMessage(msg.channel.id, `${msg.author.mention}, I sent you help in DM!`);
			return;
		} else if(!botCommands[commandName])
		{
			return;
		}
		if(botCommands[commandName].permission) 
		{
			hasPermission = UserHasPermission(msg.author.id, botCommands[commandName].permission);
		}

		if(hasPermission) 
		{
			botCommands[commandName].execute(msg, bot, suffix);
		} else {
			bot.createMessage(msg.channel.id, "Looks like you don't have permissions for that command.")
		}
	}

});

bot.connect();

function UserHasPermission(userId, permission)
{
	switch(permission)
	{
		case 'developer':
			return userId == "282235475484475392";
		default:
			return true;
	}
}
