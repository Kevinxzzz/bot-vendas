import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../../types/command.js';
import { apiClient } from '../../services/api.client.js';

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Verifica a latência do bot e a conexão com a API de Vendas'),
  execute: async (interaction) => {
    const sent = await interaction.reply({ content: 'Verificando status...', fetchReply: true, ephemeral: true });
    const botPing = sent.createdTimestamp - interaction.createdTimestamp;

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

    await interaction.editReply({
      content: `🏓 **Pong!**\n\n• **Latência do Bot:** ${botPing}ms\n• **WebSocket Discord:** ${interaction.client.ws.ping}ms\n• **Status da API:** ${apiStatus} (${apiMessage})`,
    });
  },
};

export default pingCommand;
