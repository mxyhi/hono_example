import { Hono } from "hono";
import type { BaseEnv } from "../types/context";

export const createBaseApp = () => {
  return new Hono<BaseEnv>({});
};

export const createController = () => {
  return createBaseApp();
};
