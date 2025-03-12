import { Middleware } from '../../lib/http/middleware';

export const securityHeaders: Middleware = async (req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'"); // Restringe carregamento de conteúdo externo
  res.setHeader('X-DNS-Prefetch-Control', 'off'); // Evita prefetch de DNS para maior privacidade
  res.setHeader('X-Frame-Options', 'SAMEORIGIN'); // Bloqueia ataques de clickjacking
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains'); // Força HTTPS por 180 dias
  res.setHeader('X-Download-Options', 'noopen'); // Impede downloads maliciosos
  res.setHeader('X-Content-Type-Options', 'nosniff'); // Evita ataques MIME-type sniffing
  res.setHeader('Referrer-Policy', 'no-referrer'); // Impede envio do referenciador em requisições
  res.setHeader('X-XSS-Protection', '0'); // Desativa proteção XSS (obsoleta nos navegadores modernos)

  await next();
};
