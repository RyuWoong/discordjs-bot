import { ButtonBuilder, Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Button } from '../types';

module.exports = (client: Client) => {
	let buttonsDir = join(__dirname, '../buttons');

	readdirSync(buttonsDir).forEach((file) => {
		if (!file.endsWith('.js')) return;
		let button: Button = require(`${buttonsDir}/${file}`).default;

		client.buttons.set(button.customId, button);

		console.log(`🔥 Successfully loaded button(s)`);
	});
};
