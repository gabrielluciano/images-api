import { unlink } from 'node:fs/promises';

import { sizes } from '../util/images';

export async function deleteImage(pathname: string, storagePath: string): Promise<Response> {
  const filename = pathname.replace('/image/', '');

  sizes.forEach(async function (size) {
    const path = `${storagePath}/${filename}-${size}w.webp`;
    const file = Bun.file(path);
    if (await file.exists()) await unlink(path);
  });

  return new Response(null, { status: 200 });
}
