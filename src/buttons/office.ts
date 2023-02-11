import { ChannelType, PermissionsBitField } from 'discord.js';
import { Button } from '../types';

const button: Button = {
	customId: 'office',
	execute: async (interaction) => {
		const { guild, user } = interaction;
		const role = guild?.roles.cache.get('1069772030850895963');
		const member = guild?.members.cache.get(user.id);
		if (!role || !member || !guild) {
			return;
		}
		if (!member.roles.cache.has(role.id)) {
			member.roles.add(role);
			const officeChannel = guild?.channels.cache.get('1070187911695302696');
			if (!officeChannel || officeChannel.type !== ChannelType.GuildCategory) {
				console.log('office channel not found');
				return;
			}
			const newOffice = await guild.channels.create({
				name: `${user.username}의 연구실`,
				type: ChannelType.GuildForum,
				parent: officeChannel.id,
				permissionOverwrites: [{ id: user.id, allow: PermissionsBitField.Flags.ManageChannels }],
			});
		}
		interaction.update({});
	},
};

export default button;
