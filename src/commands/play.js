const common = require("../common");
const ytdl = require("ytdl-core");

module.exports = {
  help: "Play a song...",
  usage: "play <Video Uri>",
  process: (msg, command) => {
    if (command.length < 2) {
      msg.channel.send(
        common.embedMessage(color.red, "Error", "No Video Url Supplied")
      );
      return;
    }

    execute(msg, command, queue.get(msg.guild.id));
  },
};

async function execute(msg, args, serverQueue) {
  const voiceChannel = msg.member.voice.channel;

  if (!voiceChannel)
    return msg.channel.send(
      common.embedMessage(
        color.red,
        "Error",
        "You disappoint me...\nYou need to join a voice channel first..."
      )
    );

  const permissions = voiceChannel.permissionsFor(msg.client.user);

  if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
    return msg.channel.send(
      common.embedMessage(
        color.red,
        "Error",
        "Yeah I can't connect to your voice channel...\nYou got some permissions issues to go fix."
      )
    );

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
    views: songInfo.videoDetails.viewCount,
    author: songInfo.videoDetails.author.name,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(msg.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      let connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(msg.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(msg.guild.id);
      return msg.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return msg.channel.send(
      common.embedMessage(
        color.nose,
        ":scroll: Added to Queue",
        `**[${song.title}](${song.url})**`
      )
    );
  }
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(
    common
      .embedMessage(
        color.main,
        ":star2: Now Playing",
        `**[${song.title}](${song.url})**`
      )
      .addField("Views", common.formatNumber(song.views), true)
      .addField("Author", song.author, true)
  );
}
