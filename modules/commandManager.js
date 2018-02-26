module.exports = {
	loadCommands: function(commands) 
	{
		console.log(`[DEBUG] [Command Manager] Started loading ${commands.length} commands`);
		let commandsLoaded = {};

		for(var command of commands)
		{
			let commandName = command.slice(0, -3);
			commandsLoaded[commandName] = require(`../commands/${command}`);

		}

		let commandCount = Object.keys(commandsLoaded).length;

		console.log(`[DEBUG] [Command Manager] Finished loading ${commandCount} commands`);
		return commandsLoaded;
	}
}