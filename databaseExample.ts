import { config } from 'dotenv-safe';
import postgres from 'postgres';

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  measure: string;
  origin: string;
  shortDescription: string | null;
  longDescription: string | null;
};

// Read in values from .env file to process.env
config();

const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});

const products: Product[] = await sql<Product[]>`
  SELECT
    *
  FROM
    products
  WHERE
    id = 1
`;

console.log(products);
