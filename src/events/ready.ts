import { ActivityType } from 'discord.js';
import type { Event } from '../types/event.js';

const readyEvent: Event<'clientReady'> = {
  name: 'clientReady',
  once: true,
  execute: (client) => {
    console.log(`[Bot Online] Logged in as ${client.user?.tag}!`);
    client.user?.setActivity('Sistema de Vendas API', { type: ActivityType.Watching });
  },
};

export default readyEvent;
