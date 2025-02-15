import type { Hono } from "hono";

export const onErrorHandler = (app: Hono) => {
  app.onError((err, c) => {
    console.error(err);
    return c.json({ error: err.message }, 500);
  });
};
