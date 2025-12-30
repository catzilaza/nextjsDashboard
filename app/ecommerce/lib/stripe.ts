// npm i stripe node version
// import Stripe from "stripe"; npm i stripe

// npm i @stripe/stripe-js now use this version
import { loadStripe } from "@stripe/stripe-js";

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
export const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISABLE_KEY!;

export const STRIPE_PRICE_IDS = {
  premium: "price_pe0123456789",
  pro: "price_pro0123456789",
} as const;

// export const STRIPE_PRICE_IDS = {
//   premium: "price_1S59rEAQ8LO0b8GGageAqzMu", get it from stripe website
//   pro: "price_1S59rZAQ8LO0b8GG7EngHjNX",
// } as const;

export type StripePriceId = keyof typeof STRIPE_PRICE_IDS;
