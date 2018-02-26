module.exports = {
	execute: (msg, bot, suffix) =>
	{
		bot.createMessage(msg.channel.id, `${msg.author.mention}, pong! (${bot.shards.map(shard => shard.latency)}ms)`)
	}
}