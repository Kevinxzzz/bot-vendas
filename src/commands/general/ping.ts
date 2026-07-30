import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/command.js';
// import { apiClient } from '../../services/api.client.js';

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Verifica a latência do bot no Discord'),
  execute: async (interaction) => {
    const sent = await interaction.reply({ content: 'Verificando status...', fetchReply: true, ephemeral: true });
    const botPing = sent.createdTimestamp - interaction.createdTimestamp;

    /*
    // Integração com API (comentado temporariamente)
    let apiStatus = 'Offline/Erro';
    let apiMessage = '';

    try {
      const response = await apiClient.get('/health');
      if (response.data && response.data.success) {
        apiStatus = 'Online ✅';
        apiMessage = response.data.message || 'OK';
      }
    } catch (error: any) {
      apiStatus = 'Inacessível ❌';
      apiMessage = error.message;
    }
    */

    await interaction.editReply({
      content: `🏓 **Pong!**\n\n• **Latência do Bot:** ${botPing}ms\n• **WebSocket Discord:** ${interaction.client.ws.ping}ms`,
    });
  },
};

export default pingCommand;
