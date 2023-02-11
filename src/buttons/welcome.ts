import { Button } from '../types';

const button: Button = {
	customId: 'welcome',
	execute: (interaction) => {
		const { guild, user } = interaction;
		const role = guild?.roles.cache.get('1070233787885162497');
		const member = guild?.members.cache.get(user.id);
		if (!role || !member) {
			return;
		}
		if (!member.roles.cache.has(role.id)) {
			member.roles.add(role);
		}

		interaction.update({});
	},
};

export default button;
