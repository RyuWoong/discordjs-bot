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

const officeEmbed: EmbedData = {
	title: '개인 사무실 개설',
	fields: [
		{ name: '', value: '원하신다면, 본인만의 채널을 개설할 수 있습니다.' },
		{ name: '', value: '단 **1**개만 개설 할 수 있습니다.' },
		{ name: '', value: '아래 _**개설하기**_ 버튼을 눌러 개인 사무실을 개설하세요!' },
	],
};

const officeButton: ButtonComponentData = {
	customId: 'office',
	type: ComponentType.Button,
	style: ButtonStyle.Primary,
	label: '개설하기',
};

const office = (channel: GuildBasedChannel) => {
	if (channel.type === ChannelType.GuildText) {
		const embed = new EmbedBuilder(officeEmbed);
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder(officeButton));
		channel.send({
			embeds: [embed],
			components: [row],
		});
	}
};

export default office;
