import { error } from '../util/http';

export async function getImage(pathname: string, storagePath: string): Promise<Response> {
  const filename = pathname.replace('/image/', '');
  const file = Bun.file(`${storagePath}/${filename}`);

  if (!(await file.exists())) return error('File not found', 404);

  return new Response(file);
}
