const { Events } = require('discord.js');
const { dirname } = require('path');
const { users } = require(dirname(require.main.filename) + '/valid-users.json');

const allowedUsers = [];
console.log("Allowed users include...");
for (user of users) {
    console.log(user.name);
    allowedUsers.push(user.id);
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

        if (!allowedUsers.includes(interaction.user.id)) {
            // blocked user
            return;
        }

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
