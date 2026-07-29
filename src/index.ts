import { CustomClient } from './client/CustomClient.js';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
import { env } from './config/env.js';

async function bootstrap() {
  console.log('[Bootstrap] Initializing Bot Vendas Discord Client...');
  const client = new CustomClient();

  await loadEvents(client);
  await loadCommands(client);

  if (!env.DISCORD_TOKEN) {
    console.warn('[Bootstrap Warning] DISCORD_TOKEN is missing in .env. Bot startup paused until TOKEN is provided.');
    return;
  }

  await client.login(env.DISCORD_TOKEN);
}

bootstrap().catch((err) => {
  console.error('[Bootstrap Error] Failed to start bot:', err);
});
