import {
	EmbedData,
	ButtonStyle,
	SlashCommandBuilder,
	ButtonComponentData,
	ChannelType,
	EmbedBuilder,
	ButtonBuilder,
	ComponentType,
	ActionRowBuilder,
	PermissionFlagsBits,
} from 'discord.js';
import { SlashCommand } from '../types';
import office from './init_func/office';
import welcome from './init_func/welcome';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('init')
		.setDescription('초기 설정을 담당합니다.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async (interaction) => {
		const { guild } = interaction;
		const infoChannel = guild?.channels.cache.find((channel) => channel.id === '1070226025444802640');
		if (infoChannel) {
			welcome(infoChannel);
		}
		const officeChannel = guild?.channels.cache.find((channel) => channel.id === '1070311642467942410');
		if (officeChannel) {
			office(officeChannel);
		}

		interaction.reply('초기 설정을 완료했습니다.');
	},
};

export default command;
