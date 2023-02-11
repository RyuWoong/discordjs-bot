// Require the necessary discord.js classes
import fs from 'fs';
import path from 'path';
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates] });

import { Button, SlashCommand } from './types';
import { config } from 'dotenv';
config();
// Create a new client instance

client.slashCommands = new Collection<string, SlashCommand>();
client.buttons = new Collection<string, Button>();

const handlersDir = path.join(__dirname, './handlers');
fs.readdirSync(handlersDir).forEach((handler) => {
	require(`${handlersDir}/${handler}`)(client);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
