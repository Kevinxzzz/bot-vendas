import type { ClientEvents } from 'discord.js';
import type { CustomClient } from '../client/CustomClient.js';

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (client: CustomClient, ...args: ClientEvents[K]) => Promise<void> | void;
}
