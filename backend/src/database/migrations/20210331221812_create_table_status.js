
exports.up = function(knex) {
  
    return knex.schema.createTable('status',function(table){
        table.string('id').primary();
        table.string('description').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('status');
};
