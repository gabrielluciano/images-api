export function json(data: any, init?: ResponseInit): Response {
  return Response.json(data, init);
}

export function error(message: string, status: number): Response {
  return json({ error: message, status }, { status });
}
