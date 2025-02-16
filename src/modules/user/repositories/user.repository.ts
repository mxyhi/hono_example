import { DbClient } from "@/core/db";
import { di } from "@/core/di/container";

export class UserRepository {
  constructor(private readonly db = di.get(DbClient)) {}
}
