import { REST, Routes } from 'discord.js';
import readdirp from 'fs/promises';
import path from 'path';
import fileUtils from 'fs';
import type { CustomClient } from '../client/CustomClient.js';
import type { Command } from '../types/command.js';
import { env } from '../config/env.js';

export async function loadCommands(client: CustomClient): Promise<void> {
  const commandsPath = path.join(process.cwd(), 'src', 'commands');
  const commandsData: any[] = [];

  if (!fileUtils.existsSync(commandsPath)) {
    return;
  }

  const files = getFilesRecursively(commandsPath);

  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const fileUrl = `file://${file}`;
      const commandModule = await import(fileUrl);
      const command: Command = commandModule.default || commandModule.command;

      if (command && command.data && typeof command.execute === 'function') {
        client.commands.set(command.data.name, command);
        commandsData.push(command.data.toJSON());
        console.log(`[CommandHandler] Loaded command: /${command.data.name}`);
      }
    }
  }

  const isPlaceholder = (val: string) => !val || val.includes('your_') || val.includes('seu_');

  if (!isPlaceholder(env.DISCORD_TOKEN) && !isPlaceholder(env.DISCORD_CLIENT_ID)) {
    const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);
    try {
      console.log(`[CommandHandler] Registering ${commandsData.length} slash commands...`);
      if (env.DISCORD_GUILD_ID && !isPlaceholder(env.DISCORD_GUILD_ID)) {
        await rest.put(
          Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_GUILD_ID),
          { body: commandsData }
        );
        console.log(`[CommandHandler] Guild Slash Commands registered successfully.`);
      } else {
        await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), { body: commandsData });
        console.log(`[CommandHandler] Global Slash Commands registered successfully.`);
      }
    } catch (error) {
      console.error('[CommandHandler] Error registering slash commands:', error);
    }
  } else {
    console.warn('[CommandHandler Warning] Slash commands skipped registration because DISCORD_TOKEN or DISCORD_CLIENT_ID contains placeholders in .env.');
  }
}

function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fileUtils.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fileUtils.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}
