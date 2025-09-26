import { ZodError } from 'zod';

export const handlerError = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const x = JSON.parse(err.message);
    const formattedErrors = x.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({ error: formattedErrors });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error.';
  return res.status(status).json({ error: message });
};
