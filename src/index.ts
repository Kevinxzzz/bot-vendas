import { CustomClient } from './client/CustomClient.js';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
import { env } from './config/env.js';

async function bootstrap() {
  console.log('[Bootstrap] Initializing Bot Vendas Discord Client...');
  const client = new CustomClient();

  await loadEvents(client);
  await loadCommands(client);

  const isPlaceholder = (val: string) => !val || val.includes('your_') || val.includes('seu_');

  if (isPlaceholder(env.DISCORD_TOKEN)) {
    console.warn('\n=============================================================');
    console.warn('⚠️ [AVISO] DISCORD_TOKEN não foi configurado no arquivo .env!');
    console.warn('Para conectar o bot, abra o arquivo .env e substitua os valores:');
    console.warn('  • DISCORD_TOKEN=seu_token_real_do_discord');
    console.warn('  • DISCORD_CLIENT_ID=seu_client_id_real_do_discord');
    console.warn('=============================================================\n');
    return;
  }

  await client.login(env.DISCORD_TOKEN);
}

bootstrap().catch((err) => {
  console.error('[Bootstrap Error] Failed to start bot:', err);
});
