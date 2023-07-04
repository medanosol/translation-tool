#!/usr/bin/env node

import { spawn } from "child_process";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serveProcess = spawn("serve", [resolve(__dirname, "../dist")], {
  stdio: "inherit",
});

serveProcess.on("exit", (code) => {
  process.exit(code);
});
