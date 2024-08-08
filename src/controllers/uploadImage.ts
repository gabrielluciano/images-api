import sharp from 'sharp';

import { error, json } from '../util/http';
import { VALID_FILENAME_REGEX } from '../util/regex';
import { sizes } from '../util/images';

export async function uploadImage(req: Request): Promise<Response> {
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const file = formData.get('file') as Blob;

  if (!name) return error("'name' must be present", 400);
  if (!isValidFilename(name)) return error('invalid name', 400);
  if (!(file instanceof Blob)) return error("'file' must be an image", 400);

  const buf = await file.arrayBuffer();

  let variants;
  try {
    const variantsArray = await Promise.all(sizes.map((size) => resize(buf, name, size)));
    variants = variantsArray.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
  } catch (e) {
    console.warn(e);
    return error('Error saving images. Try again later', 500);
  }

  return json({ message: 'Image successfully uploaded', name, variants }, { status: 201 });
}

async function resize(buf: ArrayBuffer, name: string, size: number): Promise<Object> {
  const filename = `public/${name}-${size}w.webp`;
  await sharp(buf).resize({ width: size, position: 'center' }).toFile(filename);
  const key = `${size}`;
  const obj: any = {};
  obj[key] = `/image/${name}-${size}w.webp`;
  return obj;
}

function isValidFilename(filename: string) {
  return VALID_FILENAME_REGEX.test(filename);
}
