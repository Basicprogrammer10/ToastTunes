const common = require("../common");

module.exports = {
  help: "Stop a song.",
  usage: "stop",
  process: (msg, command) => {
    stop(msg, queue.get(msg.guild.id));
  },
};

function stop(message, serverQueue) {
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
      common.embedMessage(color.red, "Error", "Nothing to stop...")
    );

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}
