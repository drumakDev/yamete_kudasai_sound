#!/usr/bin/env node

import meow from 'meow';
import yamete from './index';

interface Flags {
  [key: string]: any;
}

const cliMode = async ({ flags }: { flags: Flags }) => {
  while (true) {
    await yamete();
  }
};

const cliInterface = meow({});
cliMode(cliInterface);
