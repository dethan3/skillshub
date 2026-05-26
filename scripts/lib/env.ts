/**
 * Shared environment loader for scripts.
 * Import this at the top of any script that needs env vars.
 */

import { config } from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
config({ path: path.resolve(__dirname, "../../.env") });

export function getGithubToken(): string | undefined {
  return process.env.GITHUB_TOKEN || undefined;
}
