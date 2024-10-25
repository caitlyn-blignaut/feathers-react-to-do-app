import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('items', (table) => {
    table.boolean('checked')
    table.bigint('userId').references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('items', (table) => {
    table.dropColumn('checked')
    table.dropColumn('userId')
  })
}
