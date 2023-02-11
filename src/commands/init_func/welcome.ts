import {
	ActionRowBuilder,
	ChannelType,
	GuildBasedChannel,
	EmbedBuilder,
	ButtonBuilder,
	ButtonComponentData,
	EmbedData,
	ComponentType,
	ButtonStyle,
} from 'discord.js';

const welecomeEmbed: EmbedData = {
	title: '어서오세요! 깜깜한 개발 연구소에.',
	fields: [
		{ name: '', value: '이곳은 홀로 모니터 빛에 의지하여 싸우는 이들을 돕기 위한 연구소 입니다.' },
		{ name: '', value: '혹시나 모를 불이익이 없도록 규칙을 꼭 읽어주세요.' },
		{ name: '', value: '아래 _**확인했습니다**_ 버튼을 눌러 연구소로 입장하세요.' },
	],
};

const welcomeButton: ButtonComponentData = {
	customId: 'welcome',
	type: ComponentType.Button,
	style: ButtonStyle.Primary,
	label: '확인했습니다',
};

const welcome = (channel: GuildBasedChannel) => {
	if (channel.type === ChannelType.GuildText) {
		const embed = new EmbedBuilder(welecomeEmbed);
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder(welcomeButton));
		channel.send({
			embeds: [embed],
			components: [row],
		});
	}
};

export default welcome;
