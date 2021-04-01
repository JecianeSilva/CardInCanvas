
exports.up =  knex => knex.schema.createTable('cards', function (table) {
        table.increments(); 

        table.string('description').notNullable();        
        table.string('status_id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
        table.foreign('status_id').references('id').inTable('status')
      })

exports.down = knex => knex.schema.dropTable('cards');
