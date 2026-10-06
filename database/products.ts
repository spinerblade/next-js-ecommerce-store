import { cache } from 'react';
import { sql } from './connect';

// const products = [
//   {
//     id: 1,
//     name: 'durian',
//     type: 'fruit',
//     price: '6.99',
//     measure: 'kg',
//     origin: '🇹🇭',
//     shortDescription:
//       'The "king of fruits": creamy, custard-like flesh with a bold sweet aroma.',
//     longDescription:
//       'Grown in Thailand, our durian is picked at peak ripeness for rich, custard-soft flesh with notes of caramel, almond, and vanilla. Its aroma is famously strong, and fans swear it is worth it. Enjoy it fresh and chilled, blend it into ice cream or smoothies, or use it in traditional desserts like sticky rice with durian. Store in the fridge in an airtight container to keep the smell contained.',
//   },
//   {
//     id: 2,
//     name: 'thai eggplant',
//     type: 'vegetable',
//     price: '3.49',
//     measure: 'kg',
//     origin: '🇹🇭',
//     shortDescription:
//       'Small, round, crisp eggplants that soak up the flavor of Thai curries.',
//     longDescription:
//       'These golf-ball-sized green eggplants from Thailand have a firm, slightly bitter bite and a juicy, seedy center. They hold their shape when cooked, making them a staple in green and red curries, stir-fries, and spicy dips. Quarter them and add them near the end of cooking for a tender but crunchy texture. Can also be eaten raw with chili dips (nam prik).',
//   },
//   {
//     id: 3,
//     name: 'dragon fruit',
//     type: 'fruit',
//     price: '4.29',
//     measure: 'kg',
//     origin: '🇻🇳',
//     shortDescription:
//       'Vibrant pink fruit with a mildly sweet, refreshing flesh and crunchy seeds.',
//     longDescription:
//       'Sun-ripened in Vietnam, dragon fruit (pitaya) has a striking magenta skin and juicy flesh dotted with tiny edible seeds. The flavor is delicately sweet, somewhere between kiwi and pear, and best served well chilled. Slice it in half and scoop it out, cube it for fruit salads, or blend it into smoothie bowls. Naturally low in calories and a good source of fiber.',
//   },
//   {
//     id: 4,
//     name: 'water spinach',
//     type: 'vegetable',
//     price: '2.99',
//     measure: 'kg',
//     origin: '🇻🇳',
//     shortDescription:
//       'Tender hollow-stemmed greens with a crisp bite, perfect for quick stir-fries.',
//     longDescription:
//       'Also known as morning glory or kangkong, water spinach from Vietnam has crunchy hollow stems and soft, mild leaves. It cooks in minutes: stir-fry it over high heat with garlic and a splash of fish sauce for a classic Vietnamese side dish, or add it to soups and noodle bowls. Best used within a few days of purchase; store wrapped in a damp cloth in the fridge.',
//   },
//   {
//     id: 5,
//     name: 'carabao mango',
//     type: 'fruit',
//     price: '5.99',
//     measure: 'kg',
//     origin: '🇵🇭',
//     shortDescription:
//       'Honey-sweet, silky Philippine mangoes, widely loved for their rich flavor.',
//     longDescription:
//       'Carabao mangoes from the Philippines are known for their golden skin, buttery smooth flesh, and an almost honey-like sweetness with very little fiber. Enjoy them fresh off the pit, sliced over sticky rice, blended into shakes, or turned into mango float and other desserts. For the sweetest result, let them ripen at room temperature until they give slightly when pressed, then refrigerate.',
//   },
//   {
//     id: 6,
//     name: 'bitter melon',
//     type: 'vegetable',
//     price: '3.79',
//     measure: 'kg',
//     origin: '🇵🇭',
//     shortDescription:
//       'Bumpy, bold-flavored gourd prized in Filipino and Southeast Asian cooking.',
//     longDescription:
//       'Bitter melon (ampalaya) from the Philippines is an acquired taste with a distinctive, refreshing bitterness. Slice it thin, scoop out the seeds, and salt it briefly to mellow the flavor before cooking. It shines in stir-fries with egg and tomato (ginisang ampalaya), soups, and stuffed preparations. Choose firm, bright green melons and use within a week.',
//   },
// ];

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

export const getProductsInsecure = cache(async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;
  return products;
});

export const getProductInsecure = cache(async (id: number) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
});

export function Capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
