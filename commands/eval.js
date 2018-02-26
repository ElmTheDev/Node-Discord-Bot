module.exports = {
	permission: "developer",
	execute: (msg, bot, suffix) =>
	{
		try
		{
			let evaluatedCode = function() { return eval(suffix); }.call();
			bot.createMessage(msg.channel.id, `Evaluated Code\`\`\`javascript\n${suffix}\`\`\`Result\n\`\`\`javascript\n${evaluatedCode}\`\`\``);
		} catch (e) {
			bot.createMessage(msg.channel.id, `(ERROR) Evaluated Code\`\`\`javascript\n${suffix}\`\`\`Result\n\`\`\`javascript\n${e}\`\`\``)
		}
	}
}