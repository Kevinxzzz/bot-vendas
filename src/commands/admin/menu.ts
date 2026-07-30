import { SlashCommandBuilder, Events } from 'discord.js';
import type { Command } from '../../types/command.js';
import { createMainMenuComponent } from '../../components/menuComponents/mainMenu.js';

const menuCommand: Command = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Gerenciamento'),
    execute: async (interaction) => {
        const { embeds, components } = createMainMenuComponent(interaction);
        await interaction.reply({
            embeds,
            components
        });


    }
}

export default menuCommand;