import {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    type Interaction
} from 'discord.js';

export function createProductMenuComponent(interaction: Interaction) {
    const avatarUrl = interaction.client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
        .setTitle('📦 Gerenciamento de Produtos')
        .setDescription(
            [
                'Painel de gerenciamento de produtos da loja.',
                '',
                'Selecione uma opção abaixo para prosseguir:'
            ].join('\n')
        )
        .setThumbnail(avatarUrl)
        .setColor('#7C3AED');

    const menu = new StringSelectMenuBuilder()
        .setCustomId('products-menu')
        .setPlaceholder('Selecione uma ação de produto')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Criar produto')
                .setDescription('Cadastrar um novo produto na loja')
                .setValue('create_product')
                .setEmoji('➕'),

            new StringSelectMenuOptionBuilder()
                .setLabel('Ver produtos')
                .setDescription('Ver todos os produtos cadastrados')
                .setValue('list_products')
                .setEmoji('📋')
        );

    const backButton = new ButtonBuilder()
        .setCustomId('back-to-main-menu')
        .setLabel('Voltar')
        .setEmoji('⬅️')
        .setStyle(ButtonStyle.Secondary);

    const closeButton = new ButtonBuilder()
        .setCustomId('close-menu')
        .setLabel('Fechar')
        .setStyle(ButtonStyle.Danger);

    const menuRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);
    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(backButton, closeButton);

    return {
        embed,
        menuRow,
        buttonRow,
        embeds: [embed],
        components: [menuRow, buttonRow]
    };
}
