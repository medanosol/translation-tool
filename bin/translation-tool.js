#!/usr/bin/env node

import { spawn } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// get the port from the command line or use the default port 3000
const portIndex = process.argv.indexOf('--port');
const port = portIndex !== -1 ? process.argv[portIndex + 1] : 3000;

const serveProcess = spawn(
  'serve',
  [resolve(__dirname, '../dist'), '-l', port],
  {
    stdio: 'inherit',
    shell: true,
  }
);

serveProcess.on('exit', (code) => {
  process.exit(code);
});
