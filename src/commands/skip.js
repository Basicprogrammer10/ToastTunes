const common = require("../common");

module.exports = {
  help: "Skip a song",
  usage: "skip",
  process: (msg, command) => {
    skip(msg, queue.get(msg.guild.id));
  },
};

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return msg.channel.send(
      common.embedMessage(
        color.red,
        "Error",
        "You disappoint me...\nYou need to join a voice channel first..."
      )
    );

  if (!serverQueue)
    return message.channel.send(
      common.embedMessage(color.red, "Error", "Nothing to skip...")
    );
  serverQueue.connection.dispatcher.end();
}
