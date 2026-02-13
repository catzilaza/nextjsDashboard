export type ProductDessertSchema = {
  dessert_id: string;
  name_eng: string;
  name: string;
  image_url: string;
  price: string;
  amount: number;
  status: "avialable" | "unavialable";
  date: string;
};

// model Product {
//   id                String   @id @default(uuid())
//   name              String
//   description       String?
//   price             Decimal
//   stripe_product_id String   @map("stripe_product_id")
//   stripe_price_id   String   @map("stripe_price_id")
//   imageUrl          String   @map("image_url")
//   createdAt         DateTime @default(now()) @map("created_at")
//   updatedAt         DateTime @updatedAt @map("updated_at")
// }
