const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const common = require("./common.js");

const { prefix, token, activity, version } = require("../config.json");

global.client = new Discord.Client();
global.client.commands = new Discord.Collection();
global.allCommands = [];
global.queue = new Map();
global.prefix = prefix;
global.version = version;

// Command Loader Thing
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  const cmdName = file.split(".js")[0];
  allCommands.push(cmdName);
  client.commands.set(cmdName, command);
}

client.on("ready", () => {
  console.log("\033[32mLogged in as \033[36m" + client.user.tag + "\033[0m");
  client.user.setActivity(activity).then(() => {});
});

client.on("message", async (msg) => {
  // Ignore own messages
  if (msg.author === client.user) return;

  console.log(
    "\033[32m" +
      `${msg.author.username}#${msg.author.discriminator}: ${msg.content}` +
      "\033[0m"
  );

  // Ignore messages from bots
  if (msg.author.bot) return;

  // Ignore messages that don't start with the prefix
  if (!msg.content.startsWith(prefix)) return;

  // Separate the command and the arguments
  let command = msg.content.replace(prefix, "").split(" ");

  // Check if command exists
  if (!client.commands.has(command[0].toLowerCase())) {
    msg.channel.send(
      common.embedMessage(color.red, "Error", `Unknown Command \`${command}\``)
    );
    return;
  }

  try {
    await client.commands.get(command[0].toLowerCase()).process(msg, command);
  } catch (e) {
    msg.channel.send(
      common.embedMessage(
        color.red,
        "Error",
        "Please report this Bug to **Sigma#8214**\n`" + e + "`"
      )
    );
  }
});

client.login(token);
