const { commands_dir } = require("./constants");
const { join } = require("node:path");
const { readdirSync } = require("node:fs");
const { Collection } = require("discord.js");

module.exports = function importCommands () {
  const folderNames = readdirSync(commands_dir);
  const commands = [];

  for (let folderName of folderNames) {
    const filesDir = join(commands_dir, folderName);
    const filesNames = readdirSync(filesDir);

    for (let fileName of filesNames) {
      let command = require(join(filesDir, fileName));
      command.category = folderName;
      commands.push(command);
    }
  }

  return new Collection(commands.map((command) => [command.name, command]));
}