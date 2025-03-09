import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const processEnv = EnvSchema.parse(process.env);

if (!processEnv) {
  throw new Error("Invalid environment variables");
}
const queryClient = postgres(processEnv.DATABASE_URL);
const db = drizzle(queryClient);

/* Testing the connection to the database  */
/* comment out after successful connection testing  */
// const result = await db.execute("select 1");
// console.log(result);

export default db;
