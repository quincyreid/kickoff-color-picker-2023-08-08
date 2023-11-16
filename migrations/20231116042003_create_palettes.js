exports.up = function (knex) {
  return knex.schema.createTable('palettes', function (table) {
    table.increments('id')
    table.string('name', 24).notNullable()
    table.string('color1', 11).notNullable()
    table.string('color2', 11).notNullable()
    table.string('color3', 11).notNullable()
    table.string('color4', 11).notNullable()
    table.string('color5', 11).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('palettes')
}
