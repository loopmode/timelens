import knex from 'knex';
const config = require('../../../knexfile');

const db = knex(config.development);

/** this is the format we save to the DB */
export type HistoryEntry = {
  platform: string;
  title: string;
  window_id: number;
  owner_name: string;
  owner_process_id: number;
  owner_bundle_id: number | null;
  owner_path: string;
  url: string | null;
  memory_usage: number;
  duration: number;
};

export const HistoryDB = {
  find() {
    return db('history');
  },

  insert(entry: HistoryEntry) {
    return db('history')
      .insert(entry)
      .then((ids) => ({ id: ids[0] }));
  },

  remove(id: string | number) {
    return db('history').where('id', Number(id)).del();
  },
};
