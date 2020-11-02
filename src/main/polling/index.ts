// import path from 'path';
import activeWin from 'active-win';
// import * as db from '@/db/history'
const intervalDuration = 1000;
let intervalId: NodeJS.Timeout;

// var knex = require('knex')({
//   client: 'sqlite3',
//   useNullAsDefault: true,
//   connection: {
//     filename: path.join(__static, 'db/db.sqlite3'),
//   },
//   migrations: {
//     directory: path.join(__static, 'db/migrations')
//   },
//   seeds: {
//     directory: path.join(__static, 'db/seeds')
//   }
// });

async function handleTick() {
  const info = await activeWin();

  try {
    // const version = await knex.raw('SELECT VERSION()');
    console.log({ info });
  } catch (error) {
    console.error(error);
  }

  // console.log('>>', win.owner.name, win.title);
}

export function startPolling() {
  console.log('>> started');
  intervalId = setInterval(handleTick, intervalDuration);
}

export function stopPolling() {
  console.log('>> stopped');
  clearInterval(intervalId);
}
