import type { ButtonHandler } from '../../../types/command.js';
import { createMainMenuComponent } from '../../../components/menuComponents/mainMenu.js';

export const backToMainMenuButton: ButtonHandler = {
    customId: 'back-to-main-menu',
    execute: async (interaction) => {
        const { embeds, components } = createMainMenuComponent(interaction);
        await interaction.update({ embeds, components });
    }
};

export default backToMainMenuButton;
