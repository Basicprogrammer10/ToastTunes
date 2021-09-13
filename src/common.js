const Discord = require("discord.js");

global.color = {
  main: "#2fc290",
  help: "#E8DD4D",
  red: "#DB5953",
  link: "#27E2E8",
  nose: "#00EAFF",
};

module.exports = {
  embedMessage: (embedColor, title, text) => {
    return new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(title)
      .setDescription(text);
  },

  // Format a number like on youtube
  // Shorten it to like 10k or 5M
  formatNumber: (number) => {
    let units = ["", "K", "M", "B", "T"];

    while (number > 1000) {
      if (units.length == 1) {
        break;
      }

      number = number / 1000;
      units.shift();
    }

    return Math.round(number * 10) / 10 + units[0];
  },
};
