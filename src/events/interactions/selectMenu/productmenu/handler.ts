import type { SelectMenuHandler } from '../../../../types/command.js';
import { createMainMenuComponent } from '../../../../components/menuComponents/mainMenu.js';

export const productsMenuHandler: SelectMenuHandler = {
    customId: 'products-menu',
    execute: async (interaction) => {
        const selectedValue = interaction.values[0];

        switch (selectedValue) {
            case 'back_to_main': {
                const { embeds, components } = createMainMenuComponent(interaction);
                await interaction.update({ embeds, components });
                break;
            }

            case 'create_product': {
                await interaction.reply({
                    content: '➕ Funcionalidade de criar produto selecionada.',
                    ephemeral: true
                });
                break;
            }

            case 'list_products': {
                await interaction.reply({
                    content: '📋 Listagem de produtos em desenvolvimento.',
                    ephemeral: true
                });
                break;
            }

            default:
                break;
        }
    }
};

export default productsMenuHandler;
