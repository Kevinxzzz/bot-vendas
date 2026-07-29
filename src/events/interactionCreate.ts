import type { Event } from '../types/event.js';

const interactionCreateEvent: Event<'interactionCreate'> = {
  name: 'interactionCreate',
  execute: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.warn(`[Interaction] Command not found: ${interaction.commandName}`);
        return;
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(`[Interaction Error] Command execution failed:`, error);
        const replyPayload = {
          content: 'Ocorreu um erro ao executar este comando.',
          ephemeral: true,
        };
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
