import { getContext } from "hono/context-storage";
import type { BaseEnv } from "../types/context";

export const getCtx = () => {
  const c = getContext<BaseEnv>();
  return c;
};
