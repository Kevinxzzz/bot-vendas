import path from 'path';
import fileUtils from 'fs';
import type { CustomClient } from '../client/CustomClient.js';
import type { SelectMenuHandler, ButtonHandler, ModalHandler } from '../types/command.js';

export async function loadComponents(client: CustomClient): Promise<void> {
    const interactionsPath = path.join(process.cwd(), 'src', 'events', 'interactions');

    if (!fileUtils.existsSync(interactionsPath)) {
        return;
    }

    const files = getFilesRecursively(interactionsPath);

    for (const file of files) {
        if ((file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')) {
            if (path.basename(file) === 'component.ts') continue;

            const fileUrl = `file://${file}`;
            const module = await import(fileUrl);

            // Find any exported object that has customId and execute
            const exportedValues = Object.values(module);
            const handler = exportedValues.find(
                (item: any) => item && typeof item === 'object' && item.customId && typeof item.execute === 'function'
            ) as any;

            if (handler && handler.customId && typeof handler.execute === 'function') {
                if (file.includes('/buttons/')) {
                    client.buttons.set(handler.customId, handler as ButtonHandler);
                    console.log(`[ComponentHandler] Loaded Button handler for customId: ${handler.customId}`);
                } else if (file.includes('/modals/')) {
                    client.modals.set(handler.customId, handler as ModalHandler);
                    console.log(`[ComponentHandler] Loaded Modal handler for customId: ${handler.customId}`);
                } else {
                    client.selectMenus.set(handler.customId, handler as SelectMenuHandler);
                    console.log(`[ComponentHandler] Loaded SelectMenu handler for customId: ${handler.customId}`);
                }
            }
        }
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
