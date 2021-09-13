const common = require("../common");

module.exports = {
  help: "No explanation Needed...",
  usage: "help [command]",
  process: (msg, command) => {
    let commands = Array.from(global.client.commands.keys());

    if (command.length <= 1) {
      let working = "";
      let numCommands = 0;

      commands.forEach((item) => {
        let use = client.commands.get(item).usage;
        if (use === undefined) return;
        working += `${prefix}${use}\n`;
        numCommands++;
      });

      msg.channel.send(
        common.embedMessage(
          color.main,
          ":boom: Commands [" + numCommands.toString() + "]",
          `\`\`\`\n${working}\`\`\``
        )
      );
      return;
    }

    if (!client.commands.has(command[1].toLowerCase())) {
      msg.channel.send(
        common.embedMessage(
          color.red,
          `Error: :neutral_face:`,
          `\`${prefix}${command[1]}\` Is not a command...\nTry: \`${prefix}help\``
        )
      );
      return;
    }
    let commandGet = client.commands.get(command[1].toLowerCase());
    let body = `${commandGet.help}\nUsage: \`${prefix}${commandGet.usage}\``;
    msg.channel.send(
      common.embedMessage(color.help, `Help: ${command[1]}`, body)
    );
    return;
  },
};
