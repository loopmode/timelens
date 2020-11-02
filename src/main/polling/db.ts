import knex from 'knex';

const config = require('../../../knexfile');

const db = knex(config.development);

export type HistoryEntry = {
  platform: string;
  title: string;
  window_id: number;
  owner_name: string;
  owner_process_id: number;
  owner_bundle_id: number;
  owner_path: string;
  url: string;
  memory_usage: number;
  duration: number;
};

export function find() {
  return db('history');
}
export function insert(row: HistoryEntry) {
  return db('history')
    .insert(row)
    .then((ids) => ({ id: ids[0] }));
}

export function remove(id: string | number) {
  return db('history').where('id', Number(id)).del();
}
