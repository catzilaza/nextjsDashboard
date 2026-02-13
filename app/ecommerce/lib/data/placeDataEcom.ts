import { z } from "zod";

//Definition===============================================

type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

type ProductsType = ProductType[];

type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type CartItemsType = CartItemType[];

const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.string().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!",
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};

//===============================================
//Example Data

const products_desserts = [
  {
    name_eng: "Banana Egg Cake",
    name: "ขนมไข่กล้วยหอม",
    image: "/products/banana-egg-cake.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Lamphun Flower Pastry",
    name: "ขนมดอกลำพูน",
    image: "/products/lamphun-flower-pastry.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/lamphun-flower-pastry.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Raisin Bread",
    name: "ขนมปังลูกเกด",
    image: "/products/raisin-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/raisin-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Pandan Custard Bread",
    name: "ขนมปังสังขยา",
    image: "/products/pandan-custard-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pandan-custard-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Tuna Stuffed Bread",
    name: "ขนมปังไส้ทูน่า",
    image: "/products/tuna-stuffed-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/tuna-stuffed-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Mochi",
    name: "ขนมโมจิ",
    image: "/products/mochi.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/mochi.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Thai Custard",
    name: "ขนมหม้อแกง",
    image: "/products/thai-custard.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/thai-custard.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Eclair",
    name: "ขนมเอแคล",
    image: "/products/eclair.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/eclair.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Black Sesame Cookie",
    name: "ขนมคุ๊กกี้งาดำ",
    image: "/products/black-sesame-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Chocolate Chip Cookie",
    name: "ขนมคุ๊กกี้ช็อกโกแลตชิฟ",
    image: "/products/chocolate-chip-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chocolate-chip-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Viennese Cookie",
    name: "ขนมคุ๊กกี้เวียนนา",
    image: "/products/viennese-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/viennese-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Singapore Cookie",
    name: "ขนมคุ๊กกี้สิงคโปร์",
    image: "/products/singapore-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/singapore-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Fortune Cookie",
    name: "ขนมคุ๊กกี้เสี่ยงทาย",
    image: "/products/fortune-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/fortune-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Swiss Roll Cake",
    name: "ขนมเค้กโรล",
    image: "/products/swiss-roll-cake.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/swiss-roll-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Young Coconut Chiffon",
    name: "ขนมชิฟฟรอนมะพร้าวอ่อน",
    image: "/products/young-coconut-chiffon.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/young-coconut-chiffon.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Brownie",
    name: "ขนมบราวนี่",
    image: "/products/brownie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/brownie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Pineapple Pie",
    name: "ขนมพายสับปะรด",
    image: "/products/pineapple-pie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pineapple-pie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Chicken Pie",
    name: "ขนมพายไส้ไก่",
    image: "/products/chicken-pie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chicken-pie.jpg",
    price: 30,
    stock: 50,
  },
];

const product = [
  {
    name_eng: "Banana Egg Cake",
    name: "ขนมไข่กล้วยหอม",
    image: "/products/banana-egg-cake.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Lamphun Flower Pastry",
    name: "ขนมดอกลำพูน",
    image: "/products/lamphun-flower-pastry.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/lamphun-flower-pastry.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Raisin Bread",
    name: "ขนมปังลูกเกด",
    image: "/products/raisin-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/raisin-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Pandan Custard Bread",
    name: "ขนมปังสังขยา",
    image: "/products/pandan-custard-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pandan-custard-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Tuna Stuffed Bread",
    name: "ขนมปังไส้ทูน่า",
    image: "/products/tuna-stuffed-bread.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/tuna-stuffed-bread.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Mochi",
    name: "ขนมโมจิ",
    image: "/products/mochi.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/mochi.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Thai Custard",
    name: "ขนมหม้อแกง",
    image: "/products/thai-custard.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/thai-custard.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Eclair",
    name: "ขนมเอแคล",
    image: "/products/eclair.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/eclair.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Black Sesame Cookie",
    name: "ขนมคุ๊กกี้งาดำ",
    image: "/products/black-sesame-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/banana-egg-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Chocolate Chip Cookie",
    name: "ขนมคุ๊กกี้ช็อกโกแลตชิฟ",
    image: "/products/chocolate-chip-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chocolate-chip-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Viennese Cookie",
    name: "ขนมคุ๊กกี้เวียนนา",
    image: "/products/viennese-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/viennese-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Singapore Cookie",
    name: "ขนมคุ๊กกี้สิงคโปร์",
    image: "/products/singapore-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/singapore-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Fortune Cookie",
    name: "ขนมคุ๊กกี้เสี่ยงทาย",
    image: "/products/fortune-cookie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/fortune-cookie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Swiss Roll Cake",
    name: "ขนมเค้กโรล",
    image: "/products/swiss-roll-cake.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/swiss-roll-cake.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Young Coconut Chiffon",
    name: "ขนมชิฟฟรอนมะพร้าวอ่อน",
    image: "/products/young-coconut-chiffon.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/young-coconut-chiffon.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Brownie",
    name: "ขนมบราวนี่",
    image: "/products/brownie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/brownie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Pineapple Pie",
    name: "ขนมพายสับปะรด",
    image: "/products/pineapple-pie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/pineapple-pie.jpg",
    price: 30,
    stock: 50,
  },
  {
    name_eng: "Chicken Pie",
    name: "ขนมพายไส้ไก่",
    image: "/products/chicken-pie.jpg",
    image_url:
      "https://mnz3apfibi5uaxad.public.blob.vercel-storage.com/chicken-pie.jpg",
    price: 30,
    stock: 50,
  },
];

const customersandinvoices = [
  {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
    invoices: [
      {
        amount: 15795,
        status: "pending",
        date: "2022-12-06",
      },
      {
        amount: 32545,
        status: "paid",
        date: "2023-06-09",
      },
      {
        amount: 1250,
        status: "paid",
        date: "2023-06-17",
      },
    ],
  },
  {
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
    invoices: [
      {
        amount: 20348,
        status: "pending",
        date: "2022-11-14",
      },
      {
        amount: 1000,
        status: "paid",
        date: "2022-06-05",
      },
    ],
  },
  {
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
    invoices: [
      {
        amount: 3040,
        status: "paid",
        date: "2022-10-29",
      },
      {
        amount: 500,
        status: "paid",
        date: "2023-08-19",
      },
      {
        amount: 8945,
        status: "paid",
        date: "2023-06-03",
      },
    ],
  },
  {
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
    invoices: [
      {
        amount: 44800,
        status: "paid",
        date: "2023-09-10",
      },
      {
        amount: 8546,
        status: "paid",
        date: "2023-06-07",
      },
    ],
  },
  {
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
    invoices: [
      {
        amount: 34577,
        status: "pending",
        date: "2023-08-05",
      },
    ],
  },
  {
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
    invoices: [
      {
        amount: 54246,
        status: "pending",
        date: "2023-07-16",
      },
      {
        amount: 666,
        status: "pending",
        date: "2023-06-27",
      },
    ],
  },
];

const customers = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: "pending",
    date: "2022-12-06",
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: "pending",
    date: "2022-11-14",
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: "paid",
    date: "2022-10-29",
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: "paid",
    date: "2023-09-10",
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: "pending",
    date: "2023-08-05",
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: "pending",
    date: "2023-07-16",
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: "pending",
    date: "2023-06-27",
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: "paid",
    date: "2023-06-09",
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: "paid",
    date: "2023-06-17",
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: "paid",
    date: "2023-06-07",
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: "paid",
    date: "2023-08-19",
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: "paid",
    date: "2023-06-03",
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: "paid",
    date: "2022-06-05",
  },
];

const revenue = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
];

export {
  users,
  customers,
  invoices,
  revenue,
  products_desserts,
  product,
  customersandinvoices,
};

//===============================================
const users = [
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    username: "Admin",
    email: "admin@nextmail.com",
    password: "123456admin!",
    status: true,
    role: "admin",
    date: "2022-12-06",
    image_blob: "",
    image_url: "/customers/evil-rabbit.png",
  },
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6332a",
    username: "User",
    email: "user@nextmail.com",
    password: "123456user!",
    status: true,
    role: "user",
    date: "2022-12-06",
    image_blob: "",
    image_url: "/customers/delba-de-oliveira.png",
  },
];

const exampleData = [
  {
    id: 12,
    title: "Classic Black Baseball Cap",
    slug: "classic-black-baseball-cap",
    price: 58,
    description:
      "Elevate your casual wear with this timeless black baseball cap. Made with high-quality, breathable fabric, it features an adjustable strap for the perfect fit. Whether you’re out for a jog or just running errands, this cap adds a touch of style to any outfit.",
    category: {
      id: 1,
      name: "Clothes1",
      slug: "clothes1",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-31T04:19:39.000Z",
    },
    images: [
      "https://i.imgur.com/KeqG6r4.jpeg",
      "https://i.imgur.com/xGQOw3p.jpeg",
      "https://i.imgur.com/oO5OUjb.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 14,
    title: "Classic High-Waisted Athletic Shorts",
    slug: "classic-high-waisted-athletic-shorts",
    price: 43,
    description:
      "Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.",
    category: {
      id: 1,
      name: "Clothes1",
      slug: "clothes1",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-31T04:19:39.000Z",
    },
    images: [
      "https://i.imgur.com/eGOUveI.jpeg",
      "https://i.imgur.com/UcsGO7E.jpeg",
      "https://i.imgur.com/NLn4e7S.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 15,
    title: "Classic White Crew Neck T-Shirt",
    slug: "classic-white-crew-neck-t-shirt",
    price: 39,
    description:
      "Elevate your basics with this versatile white crew neck tee. Made from a soft, breathable cotton blend, it offers both comfort and durability. Its sleek, timeless design ensures it pairs well with virtually any outfit. Ideal for layering or wearing on its own, this t-shirt is a must-have staple for every wardrobe.",
    category: {
      id: 1,
      name: "Clothes1",
      slug: "clothes1",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-31T04:19:39.000Z",
    },
    images: [
      "https://i.imgur.com/axsyGpD.jpeg",
      "https://i.imgur.com/T8oq9X2.jpeg",
      "https://i.imgur.com/J6MinJn.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 16,
    title: "Classic White Tee - Timeless Style and Comfort",
    slug: "classic-white-tee-timeless-style-and-comfort",
    price: 73,
    description:
      "Elevate your everyday wardrobe with our Classic White Tee. Crafted from premium soft cotton material, this versatile t-shirt combines comfort with durability, perfect for daily wear. Featuring a relaxed, unisex fit that flatters every body type, it's a staple piece for any casual ensemble. Easy to care for and machine washable, this white tee retains its shape and softness wash after wash. Pair it with your favorite jeans or layer it under a jacket for a smart look.",
    category: {
      id: 1,
      name: "Clothes1",
      slug: "clothes1",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-31T04:19:39.000Z",
    },
    images: [
      "https://i.imgur.com/Y54Bt8J.jpeg",
      "https://i.imgur.com/SZPDSgy.jpeg",
      "https://i.imgur.com/sJv4Xx0.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 17,
    title: "Classic Black T-Shirt",
    slug: "classic-black-t-shirt",
    price: 35,
    description:
      "Elevate your everyday style with our Classic Black T-Shirt. This staple piece is crafted from soft, breathable cotton for all-day comfort. Its versatile design features a classic crew neck and short sleeves, making it perfect for layering or wearing on its own. Durable and easy to care for, it's sure to become a favorite in your wardrobe.",
    category: {
      id: 1,
      name: "Clothes1",
      slug: "clothes1",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-31T04:19:39.000Z",
    },
    images: [
      "https://i.imgur.com/9DqEOV5.jpeg",
      "https://i.imgur.com/ae0AEYn.jpeg",
      "https://i.imgur.com/mZ4rUjj.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 18,
    title: "Sleek White & Orange Wireless Gaming Controller",
    slug: "sleek-white-orange-wireless-gaming-controller",
    price: 69,
    description:
      "Elevate your gaming experience with this state-of-the-art wireless controller, featuring a crisp white base with vibrant orange accents. Designed for precision play, the ergonomic shape and responsive buttons provide maximum comfort and control for endless hours of gameplay. Compatible with multiple gaming platforms, this controller is a must-have for any serious gamer looking to enhance their setup.",
    category: {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-30T15:02:09.000Z",
    },
    images: [
      "https://i.imgur.com/ZANVnHE.jpeg",
      "https://i.imgur.com/Ro5z6Tn.jpeg",
      "https://i.imgur.com/woA93Li.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 19,
    title: "Sleek Wireless Headphone & Inked Earbud Set",
    slug: "sleek-wireless-headphone-inked-earbud-set",
    price: 44,
    description:
      "Experience the fusion of style and sound with this sophisticated audio set featuring a pair of sleek, white wireless headphones offering crystal-clear sound quality and over-ear comfort. The set also includes a set of durable earbuds, perfect for an on-the-go lifestyle. Elevate your music enjoyment with this versatile duo, designed to cater to all your listening needs.",
    category: {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-30T15:02:09.000Z",
    },
    images: [
      "https://i.imgur.com/yVeIeDa.jpeg",
      "https://i.imgur.com/jByJ4ih.jpeg",
      "https://i.imgur.com/KXj6Tpb.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 21,
    title: "Efficient 2-Slice Toaster",
    slug: "efficient-2-slice-toaster",
    price: 48,
    description:
      "Enhance your morning routine with our sleek 2-slice toaster, featuring adjustable browning controls and a removable crumb tray for easy cleaning. This compact and stylish appliance is perfect for any kitchen, ensuring your toast is always golden brown and delicious.",
    category: {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-30T15:02:09.000Z",
    },
    images: [
      "https://i.imgur.com/keVCVIa.jpeg",
      "https://i.imgur.com/afHY7v2.jpeg",
      "https://i.imgur.com/yAOihUe.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 22,
    title: "Sleek Wireless Computer Mouse",
    slug: "sleek-wireless-computer-mouse",
    price: 10,
    description:
      "Experience smooth and precise navigation with this modern wireless mouse, featuring a glossy finish and a comfortable ergonomic design. Its responsive tracking and easy-to-use interface make it the perfect accessory for any desktop or laptop setup. The stylish blue hue adds a splash of color to your workspace, while its compact size ensures it fits neatly in your bag for on-the-go productivity.",
    category: {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-30T15:02:09.000Z",
    },
    images: [
      "https://i.imgur.com/w3Y8NwQ.jpeg",
      "https://i.imgur.com/WJFOGIC.jpeg",
      "https://i.imgur.com/dV4Nklf.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
  {
    id: 23,
    title: "Sleek Modern Laptop with Ambient Lighting",
    slug: "sleek-modern-laptop-with-ambient-lighting",
    price: 43,
    description:
      "Experience next-level computing with our ultra-slim laptop, featuring a stunning display illuminated by ambient lighting. This high-performance machine is perfect for both work and play, delivering powerful processing in a sleek, portable design. The vibrant colors add a touch of personality to your tech collection, making it as stylish as it is functional.",
    category: {
      id: 2,
      name: "Electronics",
      slug: "electronics",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
      creationAt: "2025-12-30T15:02:09.000Z",
      updatedAt: "2025-12-30T15:02:09.000Z",
    },
    images: [
      "https://i.imgur.com/OKn1KFI.jpeg",
      "https://i.imgur.com/G4f21Ai.jpeg",
      "https://i.imgur.com/Z9oKRVJ.jpeg",
    ],
    creationAt: "2025-12-30T15:02:09.000Z",
    updatedAt: "2025-12-30T15:02:09.000Z",
  },
];

const peoples = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image_url:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image_url:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  },
  {
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
  },
  {
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
  },
  {
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
  },
  {
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
  },
  {
    name: "Emily",
    email: "emily.johnson@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/emilys/128",
  },
  {
    name: "Michael",
    email: "michael.williams@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/michaelw/128",
  },
  {
    name: "Sophia",
    email: "sophia.brown@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/sophiab/128",
  },
  {
    name: "Emily",
    email: "emily.johnson@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/emilys/128",
  },
  {
    name: "James",
    email: "james.davis@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/jamesd/128",
  },
  {
    name: "Emily",
    email: "emily.johnson@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/emilys/128",
  },
  {
    name: "Emma",
    email: "emma.miller@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/emmaj/128",
  },
  {
    name: "Olivia",
    email: "olivia.wilson@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/oliviaw/128",
  },
  {
    name: "Ava",
    email: "ava.taylor@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/avat/128",
  },
  {
    name: "Ethan",
    email: "ethan.martinez@x.dummyjson.com",
    image_url: "https://dummyjson.com/icon/ethanm/128",
  },
];

const productsExam: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Nike Dri Flex T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 29.9,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
  },
  {
    id: 5,
    name: "Under Armour StormFleece",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 49.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["40", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
  },
  {
    id: 7,
    name: "Nike Ultraboost Pulse ",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["40", "42", "43"],
    colors: ["gray", "pink"],
    images: { gray: "/products/7g.png", pink: "/products/7p.png" },
  },
  {
    id: 8,
    name: "Levi’s Classic Denim",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l"],
    colors: ["blue", "green"],
    images: { blue: "/products/8b.png", green: "/products/8gr.png" },
  },
];

{
  // const seed = async () => {
  //   const authors = [
  //     {
  //       name: "J.R.R. Tolkien",
  //       bio: "The creator of Middle-earth and author of The Lord of the Rings.",
  //       books: {
  //         create: [
  //           { title: "The Hobbit" },
  //           { title: "The Fellowship of the Ring" },
  //           { title: "The Two Towers" },
  //           { title: "The Return of the King" },
  //         ],
  //       },
  //     },
  //     {
  //       name: "George R.R. Martin",
  //       bio: "The author of the epic fantasy series A Song of Ice and Fire.",
  //       books: {
  //         create: [{ title: "A Game of Thrones" }, { title: "A Clash of Kings" }],
  //       },
  //     },
  //     {
  //       name: "J.K. Rowling",
  //       bio: "The creator of the Harry Potter series.",
  //       books: {
  //         create: [
  //           { title: "Harry Potter and the Philosopher's Stone" },
  //           { title: "Harry Potter and the Chamber of Secrets" },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const author of authors) {
  //     await prisma.author.create({
  //       data: author,
  //     });
  //   }
  // };
  // const seedUsers = async () => {
  //   const users = [
  //     {
  //       name: "Emily",
  //       email: "emily.johnson@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/emilys/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Fashion",
  //             slug: "fashion",
  //             img: "/blog/fashion.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "fashion", // Added required catSlug property
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Michael",
  //       email: "michael.williams@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/michaelw/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "lifestyle",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "lifestyle",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Sophia",
  //       email: "sophia.brown@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/sophiab/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "Culture",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Culture",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "James",
  //       email: "james.davis@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/jamesd/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Travel",
  //             slug: "travel",
  //             img: "/blog/travel.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "travel",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Emma",
  //       email: "emma.miller@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/emmaj/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Food",
  //             slug: "food",
  //             img: "/blog/food.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "food",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Olivia",
  //       email: "olivia.wilson@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/oliviaw/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Fitness",
  //             slug: "fitness",
  //             img: "/blog/tiktok.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "fitness",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Alexander",
  //       email: "alexander.jones@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/alexanderj/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Technology",
  //             slug: "technology",
  //             img: "/blog/youtube.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "technology",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Ava",
  //       email: "ava.taylor@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/avat/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Technology",
  //             slug: "Cat",
  //             img: "/blog/youtube.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Cat",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Ethan",
  //       email: "ethan.martinez@x.dummyjson.com",
  //       image: "https://dummyjson.com/icon/ethanm/128",
  //       Post: {
  //         create: [
  //           {
  //             title: "Lifestyle",
  //             slug: "Fish",
  //             img: "/blog/style.png",
  //             desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //             catSlug: "Fish",
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const user of users) {
  //     await prisma.post.create({
  //       data: user,
  //     });
  //   }
  // };
}

{
  // const seedCustomers = async () => {
  //   const customers = [
  //     {
  //       name: "Evil Rabbit",
  //       email: "evil@rabbit.com",
  //       image_url: "/customers/evil-rabbit.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 15795,
  //             status: "pending",
  //           },
  //           {
  //             amount: 666,
  //             status: "pending",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Delba de Oliveira",
  //       email: "delba@oliveira.com",
  //       image_url: "/customers/delba-de-oliveira.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 20348,
  //             status: "pending",
  //           },
  //           {
  //             amount: 32545,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Lee Robinson",
  //       email: "lee@robinson.com",
  //       image_url: "/customers/lee-robinson.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 3040,
  //             status: "paid",
  //           },
  //           {
  //             amount: 1250,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Michael Novotny",
  //       email: "michael@novotny.com",
  //       image_url: "/customers/michael-novotny.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 44800,
  //             status: "paid",
  //           },
  //           {
  //             amount: 8546,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Amy Burns",
  //       email: "amy@burns.com",
  //       image_url: "/customers/amy-burns.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 34577,
  //             status: "pending",
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Balazs Orban",
  //       email: "balazs@orban.com",
  //       image_url: "/customers/balazs-orban.png",
  //       invoice: {
  //         create: [
  //           {
  //             amount: 54246,
  //             status: "pending",
  //           },
  //           {
  //             amount: 1000,
  //             status: "paid",
  //           },
  //           {
  //             amount: 500,
  //             status: "paid",
  //           },
  //           {
  //             amount: 8945,
  //             status: "paid",
  //           },
  //         ],
  //       },
  //     },
  //   ];
  //   for (const customer of customers) {
  //     await prisma.customers.create({
  //       data: customer,
  //     });
  //   }
  // };
}

{
  //   const seedRevenes = async () => {
  //   const revenues = [
  //     { month: "Jan", revenue: 2000 },
  //     { month: "Feb", revenue: 1800 },
  //     { month: "Mar", revenue: 2200 },
  //     { month: "Apr", revenue: 2500 },
  //     { month: "May", revenue: 2300 },
  //     { month: "Jun", revenue: 3200 },
  //     { month: "Jul", revenue: 3500 },
  //     { month: "Aug", revenue: 3700 },
  //     { month: "Sep", revenue: 2500 },
  //     { month: "Oct", revenue: 2800 },
  //     { month: "Nov", revenue: 3000 },
  //     { month: "Dec", revenue: 4800 },
  //   ];
  //   for (const revenue of revenues) {
  //     await prisma.revenue.create({
  //       data: revenue,
  //     });
  //   }
  // };
}

// // ข้อมูลต้นฉบับ ตัวอย่างโค้ดการรวมข้อมูล
// const customers = [
//   {
//     id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
//     name: "Balazs Orban",
//     email: "balazs@orban.com",
//     image_url: "/customers/balazs-orban.png",
//   },
// ];

// const invoices = [
//   {
//     customer_id: customers[0].id,
//     amount: 15795,
//     status: "pending",
//     date: "2022-12-06",
//   },
//   {
//     customer_id: customers[0].id,
//     amount: 32545,
//     status: "paid",
//     date: "2023-06-09",
//   },
//   {
//     customer_id: customers[0].id,
//     amount: 1250,
//     status: "paid",
//     date: "2023-06-17",
//   },
// ];

// // รวม customers และ invoices เข้าด้วยกัน
// const customersAndInvoices = customers.map((customer) => {
//   return {
//     name: customer.name,
//     email: customer.email,
//     image_url: customer.image_url,
//     invoices: invoices
//       .filter((invoice) => invoice.customer_id === customer.id)
//       .map(({ amount, status, date }) => ({ amount, status, date })),
//   };
// });

// console.log(JSON.stringify(customersAndInvoices, null, 2));
//
// แสดงโค้ดการแปลงข้อมูลกลับไปเป็นข้อมูลต้นฉบับ
// import { v4 as uuidv4 } from "uuid"; // ใช้สร้าง id แบบ unique

// // ข้อมูล nested
// const customersAndInvoices = [
//   {
//     name: "Balazs Orban",
//     email: "balazs@orban.com",
//     image_url: "/customers/balazs-orban.png",
//     invoices: [
//       { amount: 15795, status: "pending", date: "2022-12-06" },
//       { amount: 32545, status: "paid", date: "2023-06-09" },
//       { amount: 1250, status: "paid", date: "2023-06-17" },
//     ],
//   },
// ];

// // แปลงกลับเป็น customers และ invoices
// const customers = customersAndInvoices.map((c) => {
//   return {
//     id: uuidv4(), // สร้าง id ใหม่ (หรือใช้ id เดิมถ้ามี)
//     name: c.name,
//     email: c.email,
//     image_url: c.image_url,
//   };
// });

// const invoices = customersAndInvoices.flatMap((c, index) => {
//   const customerId = customers[index].id;
//   return c.invoices.map((inv) => ({
//     customer_id: customerId,
//     amount: inv.amount,
//     status: inv.status,
//     date: inv.date,
//   }));
// });

// console.log("customers:", customers);
// console.log("invoices:", invoices);
