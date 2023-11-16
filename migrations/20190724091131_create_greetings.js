exports.up = function (knex) {
  return knex.schema.createTable('greetings', function (table) {
    table.increments('id')
    table.string('body', 255).notNullable()
  })

  // equivalent to
  // return knex.raw(`
  //   CREATE TABLE \`greetings\` (
  //     \`id\` integer not null primary key autoincrement,
  //     \`body\` varchar(255) not null
  //   )
  // `);
}

exports.down = function (knex) {
  return knex.schema.dropTable('greetings')
}
