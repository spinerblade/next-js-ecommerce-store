import { config } from 'dotenv-safe';
import postgres from 'postgres';

// Read in values from .env file to process.env
config();

const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

const products = await sql`
  SELECT
    *
  FROM
    products
  WHERE
    id = 1
`;

console.log(products);
