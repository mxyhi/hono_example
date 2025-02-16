import { env } from "process";

export const IsDevelopment = env.NODE_ENV === "development";

export const IsProduction = env.NODE_ENV === "production";

export const IsLocal = env.NODE_ENV === "local" || !env.NODE_ENV;
