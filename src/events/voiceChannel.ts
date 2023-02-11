import { ChannelType, PermissionFlagsBits, PermissionsBitField, VoiceState } from 'discord.js';
import { BotEvent } from '../types';

const MAKECHANNEL = '1070224002515206164';
const CATEGORY = '1067310841575256136';

const event: BotEvent = {
	name: 'voiceStateUpdate',
	execute: async (oldState: VoiceState, newState: VoiceState) => {
		const inChannelId = newState.channelId;
		const outChannelId = oldState.channelId;
		const outCategory = oldState.channel?.parentId;
		console.log(outChannelId);
		if (inChannelId === MAKECHANNEL) {
			// 세미나 생성
			await makeSeminar(newState);
		}

		if (outCategory === CATEGORY && outChannelId !== MAKECHANNEL) {
			// 세미나 종료
			await clearSeminar(oldState);
		}
	},
};

const clearSeminar = async (oldState: VoiceState) => {
	const guild = oldState.guild;
	const channel = guild.channels.cache.find((channel) => channel.id === oldState.channelId);
	if (!channel || channel.type !== ChannelType.GuildVoice) {
		return;
	}
	const members = (await channel.fetch(true)).members;
	const list = Array.from(members.values());
	console.log(list);
	if (list.length === 0) {
		channel.delete();
	}
};

const makeSeminar = async (newState: VoiceState) => {
	console.log(newState);
	const user = newState.member?.user;
	const guild = newState.guild;
	const channels = guild.channels.cache;
	const channel = channels.find((channel) => channel.name === 'seminar');
	if (!channel || !user) {
		return;
	}

	const seminarChannel = await guild.channels.create({
		name: `${user.username}의 세미나`,
		type: ChannelType.GuildVoice,
		parent: channel.id,
		permissionOverwrites: [{ id: user.id, allow: PermissionsBitField.Flags.ManageChannels }],
	});

	newState.member.voice.setChannel(seminarChannel);
};

export default event;
