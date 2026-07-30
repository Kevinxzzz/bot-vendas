import {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
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
        .setColor('#3B82F6');

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
                .setLabel('Listar produtos')
                .setDescription('Ver todos os produtos cadastrados')
                .setValue('list_products')
                .setEmoji('📋'),

            new StringSelectMenuOptionBuilder()
                .setLabel('Voltar ao menu principal')
                .setDescription('Retornar ao painel administrativo')
                .setValue('back_to_main')
                .setEmoji('⬅️')
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

    return {
        embed,
        row,
        embeds: [embed],
        components: [row]
    };
}
