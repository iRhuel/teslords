require('dotenv').config();
import yargs from 'yargs';
import wakeup from './wakeup';
import scan from './scan';

yargs
  .command('wakeup', 'wakeup all eligible vehicles', {}, wakeup)
  .command('scan', 'Poll all vehicle charging states', {}, scan).argv;
