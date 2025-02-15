import { Hono } from "hono";

export const createBaseApp = () => {
  return new Hono({});
};

export const createController = () => {
  return createBaseApp();
};
