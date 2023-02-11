import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command: SlashCommand = {
	command: new SlashCommandBuilder().setName('ping').setDescription('퐁하고 쳐냅니다!'),
	execute: async (interaction) => {
		interaction.reply({
			embeds: [{ title: '퐁!', description: '퐁하고 쳐냅니다.', author: { name: '척척박사' } }],
		});
	},
};

export default command;
