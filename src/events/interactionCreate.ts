import { Client, Events, Interaction } from 'discord.js';
import { BotEvent } from '../types';

const event: BotEvent = {
	name: Events.InteractionCreate,
	execute: async (interaction: Interaction) => {
		const { client, guild, user } = interaction;
		if (interaction.isChatInputCommand()) {
			const { commandName } = interaction;
			const command = client.slashCommands.get(commandName);
			console.log(user.username, commandName);

			if (!command) {
				console.error(`No command matching ${commandName} was found.`);
				return;
			}

			try {
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: '명령에 오류가 있습니다. 다시 시도해주세요.',
					ephemeral: true,
				});
			}
		} else if (interaction.isButton()) {
			const { customId } = interaction;
			const button = client.buttons.get(customId);
			console.log(customId, button);
			if (!button) {
				console.error(`No command matching ${customId} was found.`);
				return;
			}

			try {
				button.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: '버튼에 오류가 있습니다. 다시 시도해주세요.',
					ephemeral: true,
				});
			}
		}
	},
};

export default event;
