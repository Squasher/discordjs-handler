module.exports = {
  name: "ready",
  once: true,
  run (client) {
    console.info(`Logged in as "${client.user.tag}"`);
  }
}