import path from 'path';
import fileUtils from 'fs';
import type { CustomClient } from '../client/CustomClient.js';
import type { Event } from '../types/event.js';

export async function loadEvents(client: CustomClient): Promise<void> {
  const eventsPath = path.join(process.cwd(), 'src', 'events');

  if (!fileUtils.existsSync(eventsPath)) {
    return;
  }

  const files = fileUtils.readdirSync(eventsPath);

  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const filePath = path.join(eventsPath, file);
      const fileUrl = `file://${filePath}`;
      const eventModule = await import(fileUrl);
      const event: Event = eventModule.default || eventModule.event;

      if (event && event.name && typeof event.execute === 'function') {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
          client.on(event.name, (...args) => event.execute(client, ...args));
        }
        console.log(`[EventHandler] Loaded event listener: ${String(event.name)}`);
      }
    }
  }
}
