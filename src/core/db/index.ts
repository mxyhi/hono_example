import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "node:process";
import pg from "pg";
import { requestContext } from "../async_context/context";

export class DbClient {
  private readonly pool!: pg.Pool;
  readonly client!: ReturnType<typeof drizzle>;

  constructor(private readonly c = requestContext.get()) {
    this.pool = new pg.Pool({
      connectionString: env.POSTGRES_URL!,
    });
    this.client = drizzle({ client: this.pool });
  }
}
