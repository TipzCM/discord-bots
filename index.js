const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, IntentsBitField, Collection, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');



// Create a new client instance
const intents = new IntentsBitField();
intents.add(
    GatewayIntentBits.Guilds,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages, // to send messages
    IntentsBitField.Flags.MessageContent, // to read messages (for future?)
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.DirectMessageReactions,
    IntentsBitField.Flags.GuildMembers   // for greetings/goodbyes
 );

const client = new Client({
    intents: intents
});

// add commands to bot
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const dirents = fs.readdirSync(foldersPath, { withFileTypes: true });
const commandFolders = dirents.filter(d => d.isDirectory()).map(dirent => dirent.name);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// events
//https://gist.github.com/Iliannnn/f4985563833e2538b1b96a8cb89d72bb
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);
