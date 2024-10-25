import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('items', (table) => {
    table.dateTime('dateCreated')
    table.dateTime('dueDate')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('items', (table) => {
    table.dropColumn('dateCreated')
    table.dropColumn('dueDate')
  })
}
