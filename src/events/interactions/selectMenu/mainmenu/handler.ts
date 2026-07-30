import type { SelectMenuHandler } from '../../../../types/command.js';
import { createProductMenuComponent } from '../../../../components/menuComponents/productMenu.js';
import { createMainMenuComponent } from '../../../../components/menuComponents/mainMenu.js';

export const adminMenuHandler: SelectMenuHandler = {
    customId: 'admin-menu',
    execute: async (interaction) => {
        const selectedValue = interaction.values[0];

        switch (selectedValue) {
            case 'products': {
                const { embeds, components } = createProductMenuComponent(interaction);
                await interaction.update({ embeds, components });
                break;
            }

            case 'financial': {
                await interaction.reply({
                    content: '📊 Módulo financeiro em desenvolvimento.',
                    ephemeral: true
                });
                break;
            }

            default: {
                const { embeds, components } = createMainMenuComponent(interaction);
                await interaction.update({ embeds, components });
                break;
            }
        }
    }
};

export default adminMenuHandler;
