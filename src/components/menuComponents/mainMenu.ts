import {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    type Interaction
} from 'discord.js';

export function createMainMenuComponent(interaction: Interaction) {
    const avatarUrl = interaction.client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
        .setTitle('Painel Administrativo')
        .setDescription(
            [
                'Bem-vindo ao painel administrativo!',
                '',
                'Selecione uma opção abaixo...'
            ].join('\n')
        )
        .setThumbnail(avatarUrl)
        .setColor('#7C3AED');

    const menu = new StringSelectMenuBuilder()
        .setCustomId('admin-menu')
        .setPlaceholder('Selecione uma opção')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Gerenciar produtos')
                .setDescription('Criar, editar e excluir produtos')
                .setValue('products')
                .setEmoji('📦'),

            new StringSelectMenuOptionBuilder()
                .setLabel('Financeiro')
                .setDescription('Visualizar pagamentos e faturamento')
                .setValue('financial')
                .setEmoji('💵')
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

    return {
        embed,
        row,
        embeds: [embed],
        components: [row]
    };
}
