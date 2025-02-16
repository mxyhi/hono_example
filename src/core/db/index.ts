import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "node:process";
import { Pool } from "pg";
import { requestContext } from "../async_context/context";

const pool = new Pool({
  connectionString: env.POSTGRES_URL!,
});

export const db = drizzle({ client: pool });

export class DbClient {
  private readonly pool!: Pool;
  readonly client!: ReturnType<typeof drizzle>;

  constructor(private readonly c = requestContext.get()) {
    this.pool = new Pool({
      connectionString: env.POSTGRES_URL!,
    });
    this.client = drizzle({ client: this.pool });
  }
}
