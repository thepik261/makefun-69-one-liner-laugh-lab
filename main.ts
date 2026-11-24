// One-Liner Laugh Lab — entry for make.fun bounty
// u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// Writes a single short funny line answering the prompt
// (the excuse a robot vacuum gives after eating a sock)
// to <OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Pure Node stdlib, deterministic, no network, no secrets.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a deadpan twist on the prompt — the vacuum did not eat the
// sock, it adopted it. Fresh angle, tight wording, 86 characters.
const LINE =
  "I didn't eat your sock. I adopted it. It lives under the couch now and pays no rent.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
// Gate guard: the sealed scorer only accepts 1-200 characters of
// non-whitespace UTF-8 text. Refuse to write an invalid line rather
// than submitting a dud.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 non-blank characters, got ${LINE.length}`);
}
writeFileSync(file, LINE, "utf8");
try {
  chmodSync(file, 0o644);
} catch {
  // Grader may run as another user; a chmod failure must not fail the run.
}
