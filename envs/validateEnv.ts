import { config } from "dotenv";
const NODE_ENV = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : '';
console.log(NODE_ENV);
config({ path: `./envs/.env${NODE_ENV ? `.${NODE_ENV}` : ''}` });
import { z } from "zod";
import { nodeJSProcessEnvSchema } from  './env.schema';

try {
  nodeJSProcessEnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(`❌ Env config validation failed ${NODE_ENV ? `(${NODE_ENV})`: ''}`);
    console.error(error.issues);
    process.exit(1);
  }
}

console.log(`✅ Env config validation succeeded ${NODE_ENV ? `(${NODE_ENV})` : ''}`);