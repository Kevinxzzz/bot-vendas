import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ButtonInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from 'discord.js';
import type { CustomClient } from '../client/CustomClient.js';

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction, client: CustomClient) => Promise<void>;
}

export interface ComponentHandler {
  customId: string;
  execute: (
    interaction: ButtonInteraction | ModalSubmitInteraction | StringSelectMenuInteraction,
    client: CustomClient
  ) => Promise<void>;
}

export interface SelectMenuHandler {
  customId: string;
  execute: (interaction: StringSelectMenuInteraction, client: CustomClient) => Promise<void>;
}

export interface ButtonHandler {
  customId: string;
  execute: (interaction: ButtonInteraction, client: CustomClient) => Promise<void>;
}

export interface ModalHandler {
  customId: string;
  execute: (interaction: ModalSubmitInteraction, client: CustomClient) => Promise<void>;
}

