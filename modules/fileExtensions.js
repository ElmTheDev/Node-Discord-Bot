module.exports = {
	fetchCommands: function(path, extension, fileSystem)
	{
		let commands = fileSystem.readdirSync(path);
		let loadedCommands = [];

		console.log(`[DEBUG] [File Extension] Started fetching commands from '${path}'.`);

		for(var command of commands)
		{
			if(command.endsWith(extension))
			{
				loadedCommands.push(command);
			}
		}

		console.log(`[DEBUG] [File Extension] Finished fetching ${loadedCommands.length} commands.`);
		return loadedCommands;
	}
}