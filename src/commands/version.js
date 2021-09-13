const common = require("../common");
const Discord = require("discord.js");

module.exports = {
  help: "Give Bot Information",
  usage: "version",
  process: (msg, command) => {
    msg.channel.send(
      common
        .embedMessage(
          color.main,
          "Version",
          "Version: " +
            version +
            "\n Created by **Sigma76**\nDiscord: Sigma#8214"
        )
        .attachFiles(
          new Discord.MessageAttachment("../assets/Sigma.png", "file.png")
        )
        .setThumbnail("attachment://file.png")
        .setURL("https://github.com/Basicprogrammer10")
    );
  },
};
