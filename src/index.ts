import { error } from './util/http';
import { DELETE_IMAGE_PATH_REGEX, GET_IMAGE_PATH_REGEX } from './util/regex';

import { uploadImage } from './controllers/uploadImage';
import { getImage } from './controllers/getImage';
import { deleteImage } from './controllers/deleteImage';
import { getPort, getStoragePath } from './util/env';

const storagePath = await getStoragePath();

const server = Bun.serve({
  port: getPort(),
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname == '/image/upload' && req.method == 'POST')
      return uploadImage(req, storagePath);

    if (GET_IMAGE_PATH_REGEX.test(url.pathname) && req.method == 'GET')
      return getImage(url.pathname, storagePath);

    if (DELETE_IMAGE_PATH_REGEX.test(url.pathname) && req.method == 'DELETE')
      return deleteImage(url.pathname, storagePath);

    return error('Path not found', 404);
  },
});

console.log(`Server running on port ${server.port}`);
