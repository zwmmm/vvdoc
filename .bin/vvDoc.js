#!/usr/bin/env node
const { fork } = require('child_process');

module.exports = () => {
  const child = fork(require.resolve('vite/bin/vite'), [...(process.argv.slice(2) || [])], {
    stdio: 'inherit',
  });

  child.on('exit', (code, signal) => {
    if (signal === 'SIGABRT') {
      process.exit(1);
    }
    process.exit(code);
  });

  child.on('message', args => {
    if (process.send) {
      process.send(args);
    }
  });

  process.on('SIGINT', () => {
    child.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    child.kill('SIGTERM');
  });
};
