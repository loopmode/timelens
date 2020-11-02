exports.up = function (knex) {
  return knex.schema.createTable('history', (tbl) => {
    tbl.increments();
    // basically all values of the json from https://github.com/sindresorhus/active-win#result
    tbl.text('platform', 32).notNullable();
    tbl.text('title', 'longtext').notNullable();
    tbl.integer('window_id').notNullable();
    //
    tbl.text('owner_name', 256).notNullable();
    tbl.integer('owner_process_id').notNullable();
    tbl.integer('owner_bundle_id'); // macOS only
    tbl.text('owner_path', 'longtext').notNullable();
    //
    tbl.integer('url'); // macOS only
    tbl.integer('memory_usage').notNullable();
    //
    // and some custom fields
    tbl.integer('duration');
  });
};

exports.down = function (knex) {
  knex.schema.droptableIfExists('history');
};
