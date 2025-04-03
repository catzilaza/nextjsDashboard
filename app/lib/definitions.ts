// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  user_id: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  roll: "admin" | "user";
  date: string;
  image_blob: string;
  image_url: string;
};

export type UserSessionTable = {
  user_id: string;
  session_id: string;
  session_token: string;
  expires: string;
  user_agent: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
  user: User;
};

export type Account = {
  user_id: string;
  provider: string;
  provider_account_id: string;
  type: string;
  access_token: string;
  expires_at: string;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  access_token_expires_at: string;
  refresh_token: string;
  id_token_expires_at: string;
  id_token_expires: string;
  created_at: string;
  updated_at: string;
  user: User;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export type ProductDessertTableType = {
  dessert_id: string;
  name_eng: string;
  name: string;
  image_url: string;
  price: string;
  amount: number;
  status: "avialable" | "unavialable";
  date: string;
};

export type ProductDessertCardProps = {
  dessert_id: string;
  name_eng: string;
  name: string;
  image_url: string;
  price: string;
  amount: number;
  status: "avialable" | "unavialable";
  date: string;
};

export type ProductDessertForm = {
  dessert_id: string;
  name_eng: string;
  name: string;
  image_url: string;
  price: string;
  amount: number;
  status: "avialable" | "unavialable";
  date: string;
};

export type ProductDessertField = {
  dessert_id: string;
  name_eng: string;
  name: string;
  image_url: string;
  price: string;
  amount: number;
  status: "avialable" | "unavialable";
  date: string;
};
