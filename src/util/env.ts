import { existsSync } from 'node:fs';

export function getPort() {
  const port = Number(process.env.API_PORT);
  if (isNaN(port)) return 3000;
  return port;
}

export async function getStoragePath() {
  const path = process.env.STORAGE_PATH;
  if (!path) throw new Error('Storage path is not defined');

  if (!existsSync(path)) throw new Error('Path not found');

  return path;
}
