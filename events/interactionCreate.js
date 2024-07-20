const { Events } = require('discord.js');
const { isAllowedUser } = require('../other/allowedUsers');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

        if (!isAllowedUser(interaction.user.id)) {
			console.log(`${interaction.user.displayName} : ${interaction.user.id} tried to call an interaction, but they are a blocked user.`)
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
