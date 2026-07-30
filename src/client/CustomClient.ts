import { Client, Collection, GatewayIntentBits } from 'discord.js';
import type { Command, SelectMenuHandler, ButtonHandler, ModalHandler } from '../types/command.js';

export class CustomClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public selectMenus: Collection<string, SelectMenuHandler> = new Collection();
  public buttons: Collection<string, ButtonHandler> = new Collection();
  public modals: Collection<string, ModalHandler> = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }
}
