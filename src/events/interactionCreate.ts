import type { Event } from '../types/event.js';

const interactionCreateEvent: Event<'interactionCreate'> = {
  name: 'interactionCreate',
  execute: async (client, interaction) => {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
          console.warn(`[Interaction] Command not found: ${interaction.commandName}`);
          return;
        }
        await command.execute(interaction, client);
        return;
      }

      if (interaction.isStringSelectMenu()) {
        const handler = client.selectMenus.get(interaction.customId);
        if (!handler) {
          console.warn(`[Interaction] SelectMenu handler not found for customId: ${interaction.customId}`);
          return;
        }
        await handler.execute(interaction, client);
        return;
      }

      if (interaction.isButton()) {
        const handler = client.buttons.get(interaction.customId);
        if (!handler) {
          console.warn(`[Interaction] Button handler not found for customId: ${interaction.customId}`);
          return;
        }
        await handler.execute(interaction, client);
        return;
      }

      if (interaction.isModalSubmit()) {
        const handler = client.modals.get(interaction.customId);
        if (!handler) {
          console.warn(`[Interaction] Modal handler not found for customId: ${interaction.customId}`);
          return;
        }
        await handler.execute(interaction, client);
        return;
      }
    } catch (error) {
      console.error(`[Interaction Error] Failed to process interaction:`, error);
      const replyPayload = {
        content: 'Ocorreu um erro ao processar esta interação.',
        ephemeral: true,
      };
      if (interaction.isRepliable()) {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(replyPayload);
        } else {
          await interaction.reply(replyPayload);
        }
      }
    }
  },
};

export default interactionCreateEvent;
