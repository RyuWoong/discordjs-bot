import { SlashCommandBuilder, ChannelType } from 'discord.js';
import { SlashCommand } from '../types';
import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';

const command: SlashCommand = {
	command: new SlashCommandBuilder().setName('seminar').setDescription('세미나실에 음성채널을 생성합니다.'),
	execute: async (interaction) => {
		const user = interaction.user;
		const guild = interaction.guild;
		if (!guild) {
			interaction.reply('이 명령어는 서버에서만 사용할 수 있습니다.');
			return;
		}
		const channels = guild?.channels.cache;
		const channel = channels.find((channel) => channel.name === '세미나실');
		if (!channel) {
			interaction.reply('세미나실이 존재하지 않습니다.');
			return;
		}

		const seminarChannel = await guild.channels.create({
			name: `${user.username}의 세미나`,
			type: ChannelType.GuildVoice,
			parent: channel.id,
		});
		joinVoiceChannel({
			channelId: seminarChannel.id,
			guildId: guild.id,
			adapterCreator: guild.voiceAdapterCreator,
			selfDeaf: false,
			selfMute: false,
		});
		interaction.reply('세미나를 생성했습니다.   : ) Enjoy, Talk!');
	},
};

export default command;
