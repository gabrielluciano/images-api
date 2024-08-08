export function getPort() {
  const port = Number(process.env.API_PORT);
  if (isNaN(port)) return 3000;
  return port;
}
