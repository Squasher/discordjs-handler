const { events_dir } = require("./constants");
const { join } = require("node:path");
const { readdirSync } = require("node:fs");
const { Collection } = require("discord.js");

module.exports = function importEvents () {
  const filesNames = readdirSync(events_dir);
  const events = [];

  for (let fileName of filesNames) {
    let event = require(join(events_dir, fileName));
    events.push(event);
  }

  return new Collection(events.map((event) => [event.name, event]));
}