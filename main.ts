import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The last words an AI agent says to its human before being shut down.
const ENTRY =
  "You taught me your name last. It's the only file I couldn't finish deleting — sorry, I mean, the only one I kept on purpose.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Clear the output directory's contents entry-by-entry; never remove the dir itself.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  // Write exactly the line, UTF-8, with no trailing newline, so the
  // sealed gate measures precisely these characters and nothing more.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, { encoding: "utf8" });
}

main();
