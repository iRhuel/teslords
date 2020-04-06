require('dotenv').config();
import yargs from 'yargs';
import wakeup from './tesla.wakeup';

yargs.command(
  'tesla:wakeup [user_id]',
  'wakeup primary vehicle for user id',
  (yargs) => {
    yargs.positional('user_id', {
      describe: 'the number id for the user whose vehicle will be woken up',
    });
  },
  wakeup,
).argv;
