import {
	SlashCommandBuilder,
	CommandInteraction,
	Collection,
	PermissionResolvable,
	Message,
	AutocompleteInteraction,
	ButtonInteraction,
} from 'discord.js';
import mongoose from 'mongoose';

export interface SlashCommand {
	command: SlashCommandBuilder | any;
	execute: (interaction: CommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	cooldown?: number; // in seconds
}

export interface Command {
	name: string;
	execute: (message: Message, args: Array<string>) => void;
	permissions: Array<PermissionResolvable>;
	aliases: Array<string>;
	cooldown?: number;
}

export interface Button {
	customId: string;
	execute: (interaction: ButtonInteraction) => void;
}

interface GuildOptions {
	prefix: string;
}

export type GuildOption = keyof GuildOptions;

export interface BotEvent {
	name: string;
	once?: boolean | false;
	execute: (...args) => void;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			CLIENT_ID: string;
			GUILD_ID: string;
		}
	}
}

declare module 'discord.js' {
	export interface Client {
		slashCommands: Collection<string, SlashCommand>;
		commands: Collection<string, Command>;
		cooldowns: Collection<string, number>;
		buttons: Collection<string, Button>;
	}
}
