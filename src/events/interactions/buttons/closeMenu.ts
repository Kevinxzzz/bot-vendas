import type { ButtonHandler } from '../../../types/command.js';

export const closeMenuButton: ButtonHandler = {
    customId: 'close-menu',
    execute: async (interaction) => {
        await interaction.message.delete();
    }
};

export default closeMenuButton;
