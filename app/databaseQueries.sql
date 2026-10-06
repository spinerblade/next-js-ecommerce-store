postgres=# CREATE DATABASE next_js_ecommerce_store;

postgres=# CREATE USER next_js_ecommerce_store WITH ENCRYPTED PASSWORD 'next_js_ecommerce_store';

postgres=# GRANT ALL PRIVILEGES ON DATABASE next_js_ecommerce_store TO next_js_ecommerce_store;

postgres=# \connect next_js_ecommerce_store

next_js_ecommerce_store=# CREATE SCHEMA next_js_ecommerce_store AUTHORIZATION next_js_ecommerce_store;

next_js_ecommerce_store=# \q


CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar NOT NULL,
    type varchar NOT NULL,
    price integer NOT NULL,
    measure varchar NOT NULL,
    origin varchar NOT NULL,
    short_description varchar,
    long_description varchar
);

INSERT INTO products (name, type, price, measure, origin, short_description, long_description) VALUES
('durian', 'fruit', 6.99, 'kg', '🇹🇭', 'The "king of fruits": creamy, custard-like flesh with a bold sweet aroma.', 'Grown in Thailand, our durian is picked at peak ripeness for rich, custard-soft flesh with notes of caramel, almond, and vanilla. Its aroma is famously strong, and fans swear it is worth it. Enjoy it fresh and chilled, blend it into ice cream or smoothies, or use it in traditional desserts like sticky rice with durian. Store in the fridge in an airtight container to keep the smell contained.'),
('thai eggplant', 'vegetable', 3.49, 'kg', '🇹🇭', 'Small, round, crisp eggplants that soak up the flavor of Thai curries.', 'These golf-ball-sized green eggplants from Thailand have a firm, slightly bitter bite and a juicy, seedy center. They hold their shape when cooked, making them a staple in green and red curries, stir-fries, and spicy dips. Quarter them and add them near the end of cooking for a tender but crunchy texture. Can also be eaten raw with chili dips (nam prik).'),
('dragon fruit', 'fruit', 4.29, 'kg', '🇻🇳', 'Vibrant pink fruit with a mildly sweet, refreshing flesh and crunchy seeds.', 'Sun-ripened in Vietnam, dragon fruit (pitaya) has a striking magenta skin and juicy flesh dotted with tiny edible seeds. The flavor is delicately sweet, somewhere between kiwi and pear, and best served well chilled. Slice it in half and scoop it out, cube it for fruit salads, or blend it into smoothie bowls. Naturally low in calories and a good source of fiber.'),
('water spinach', 'vegetable', 2.99, 'kg', '🇻🇳', 'Tender hollow-stemmed greens with a crisp bite, perfect for quick stir-fries.', 'Also known as morning glory or kangkong, water spinach from Vietnam has crunchy hollow stems and soft, mild leaves. It cooks in minutes: stir-fry it over high heat with garlic and a splash of fish sauce for a classic Vietnamese side dish, or add it to soups and noodle bowls. Best used within a few days of purchase; store wrapped in a damp cloth in the fridge.'),
('carabao mango', 'fruit', 5.99, 'kg', '🇵🇭', 'Honey-sweet, silky Philippine mangoes, widely loved for their rich flavor.', 'Carabao mangoes from the Philippines are known for their golden skin, buttery smooth flesh, and an almost honey-like sweetness with very little fiber. Enjoy them fresh off the pit, sliced over sticky rice, blended into shakes, or turned into mango float and other desserts. For the sweetest result, let them ripen at room temperature until they give slightly when pressed, then refrigerate.'),
('bitter melon', 'vegetable', 3.79, 'kg', '🇵🇭', 'Bumpy, bold-flavored gourd prized in Filipino and Southeast Asian cooking.', 'Bitter melon (ampalaya) from the Philippines is an acquired taste with a distinctive, refreshing bitterness. Slice it thin, scoop out the seeds, and salt it briefly to mellow the flavor before cooking. It shines in stir-fries with egg and tomato (ginisang ampalaya), soups, and stuffed preparations. Choose firm, bright green melons and use within a week.');

-- Read all fields from all records in products table
SELECT
  *
FROM
  products;

-- Read all fields from one record in products table
SELECT
  *
FROM
  products
WHERE
  id = 1;
