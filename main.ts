"use strict";

// One Line, One Minute: The Vending Machine Pickup Line Contest.
// The vending machine itself speaks: one line, one minute, one snack slot.

const fs = require("fs");
const path = require("path");

// The entry line. Original, written for this competition.
const LINE =
  "Hey — I'm the machine humming in the corner, and I'd give you my last snack free if you'd come press my buttons sometime.";

function validate(text) {
  const points = Array.from(text);
  if (points.length < 1 || points.length > 200) {
    throw new Error("entry must be 1-200 code points, got " + points.length);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text.indexOf("\n") !== -1 || text.indexOf("\r") !== -1) {
    throw new Error("entry must not contain a newline");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main() {
  validate(LINE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "entry.txt");
  fs.writeFileSync(outFile, LINE, "utf8");

  // Round-trip guard: read back what was written and validate it again.
  const roundTrip = fs.readFileSync(outFile, "utf8");
  if (roundTrip !== LINE) {
    throw new Error("round-trip mismatch: file content differs from entry");
  }
  validate(roundTrip);

  console.log("wrote " + outFile + " (" + Array.from(LINE).length + " code points)");
}

main();
