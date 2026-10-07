import type { Sql } from 'postgres';

export type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  measure: string;
  origin: string;
  shortDescription: string | null;
  longDescription: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar NOT NULL,
      type varchar NOT NULL,
      price numeric(10, 2) NOT NULL,
      measure varchar NOT NULL,
      origin varchar NOT NULL,
      short_description varchar,
      long_description varchar
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products `;
}
