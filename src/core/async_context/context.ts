import type { Context } from "hono";
import { AsyncContextStore } from "./store";

export const requestContext = new AsyncContextStore<Context>();
