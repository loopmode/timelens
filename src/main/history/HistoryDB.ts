import knex from 'knex';
const config = require('../../../knexfile');

const db = knex(
  process.env.NODE_ENV === 'production' ? config.production : config.development
);

const query = () => db('history');

export const HistoryDB = {
  find() {
    return query();
  },

  async insert(entry: Partial<HistoryEntry>): Promise<HistoryEntry> {
    const ids = await query().insert(entry);
    const [result] = await query().select().where('id', ids[0]);
    return result;
  },

  remove(id: string | number) {
    return query().where('id', Number(id)).del();
  },
};
