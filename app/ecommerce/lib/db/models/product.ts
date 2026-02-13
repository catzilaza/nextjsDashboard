export interface IProduct {
  id: string;
  name: string;
  name_eng: string;
  description: string;
  image: string;
  image_url?: string | null | undefined;
  price: number;
  stock: number;
  status: string;
  stripePriceId: string;
  stripeProductId: string;
}

export type Product = {
  id: string;
  name: string;
  name_eng: string;
  description: string;
  image: string;
  image_url: string;
  price: number;
  stock: number;
  status: string;
  stripePriceId: string;
  stripeProductId: string;
};

// model Product {
//   id              String   @id @default(cuid())
//   name            String?
//   name_eng        String?
//   description     String?
//   image           String?
//   image_url       String?
//   price           Float?
//   stock           Int?
//   status          String?
//   stripePriceId   String?
//   stripeProductId String?
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt

//   // Relations
//   orders       Order[]
//   orderItems   OrderItem[]
//   invoiceItems InvoiceItem[]
// }
