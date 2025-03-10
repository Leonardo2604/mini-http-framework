import { Middleware } from '../http/middleware';

export const loggerMiddleware: Middleware = async (req, res, next) => {
  const start = process.hrtime();

  res.raw.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);
    console.log(`${req.method} ${req.url} - ${durationMs}ms`);
  });

  await next();
};
