import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/command.js";

const serverCommand: Command = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Mostra informações do servidor'),
    execute: async (interaction) => {
        await interaction.reply({ content: 'Verificando informações...' });
        const { guild } = interaction;
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle(guild?.name || 'Servidor')
            .setThumbnail(guild?.iconURL() || null)
            .addFields(
                { name: '👑 Dono:', value: `<@${guild?.ownerId}>`, inline: true },
                { name: '👥 Membros:', value: `${guild?.memberCount}`, inline: true },
                { name: '🗓️ Criado em:', value: `<t:${Math.floor((guild?.createdTimestamp || 0) / 1000)}:D>`, inline: true }
            )
            .setTimestamp();

        await interaction.editReply({ content: '', embeds: [embed] });
    }
}

export default serverCommand;