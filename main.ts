import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I put a lock on the thermostat because I'm not paying to heat the whole street. Now my kids say Dad's not cool.";

// Gate self-check: the sealed scorer accepts UTF-8 text of 1-200
// characters that is not only whitespace.
if (TEXT.length < 1 || TEXT.length > 200 || TEXT.trim().length === 0) {
  throw new Error(`entry text fails the gate: ${TEXT.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the CONTENTS of the output directory; the grader owns the
// directory itself, so it must never be removed.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
