import path from 'path';
import knex from 'knex';

const dbConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__static, 'db/default.sqlite3'),
  },
};

if (process.env.NODE_ENV !== 'production') {
  dbConfig.connection.filename = path.resolve(
    __static,
    '../.local/default.sqlite3'
  );
}

const db = knex(dbConfig);
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
