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
            // Ignore pure UI component files named component.ts
            if (path.basename(file) === 'component.ts') continue;

            const fileUrl = `file://${file}`;
            const module = await import(fileUrl);
            const handler = module.default || module.handler || module.adminMenuHandler || module.productsMenuHandler;

            if (handler && handler.customId && typeof handler.execute === 'function') {
                client.selectMenus.set(handler.customId, handler as SelectMenuHandler);
                console.log(`[ComponentHandler] Loaded SelectMenu handler for customId: ${handler.customId}`);
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
