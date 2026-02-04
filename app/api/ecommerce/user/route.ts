import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/ecommerce/lib/prisma";
import {
  getCurrentSession,
  getCurrentUser,
} from "@/app/betterauth/actions/users";
import { Address } from "@/lib/schemaProject/schemaAllProject";

const db = prisma;

// Zod schema for validation
const AddressSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email("Please enter a valid email address."),
  street: z
    .string()
    .min(5, "Street must be at least 5 characters.")
    .max(32, "Street must be at most 32 characters."),
  city: z
    .string()
    .min(5, "City must be at least 5 characters.")
    .max(32, "City must be at most 32 characters."),
  state: z
    .string()
    .min(5, "State must be at least 5 characters.")
    .max(10, "State must be at most 10 characters."),
  zipcode: z
    .string()
    .min(5, "Zipcode must be at least 5 characters.")
    .max(32, "Zipcode must be at most 32 characters."),
  country: z
    .string()
    .min(5, "Country must be at least 5 characters.")
    .max(32, "Country must be at most 32 characters."),
  phone: z
    .string()
    .min(5, "Phone must be at least 5 characters.")
    .max(32, "Phone must be at most 32 characters."),
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export async function POST(req: NextRequest) {
  try {
    const login_session1 = await getCurrentSession();
    let login_session = undefined;

    if (login_session1) {
      login_session = await getCurrentUser();
    }

    if (!login_session) {
      console.log("message: Unauthorized status: 401");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate with Zod
    const validatedData = AddressSchema.parse(body);

    const { name, street, city, state, zipcode, country, phone } =
      validatedData;

    if (!name || !street || !city || !state || !zipcode || !country || !phone) {
      return NextResponse.json(
        { message: "Fields are required." },
        { status: 400 },
      );
    }

    const address = await db.address.create({
      data: {
        name,
        email: login_session.user.email,
        street,
        city,
        state,
        zip: zipcode,
        country,
        phone,
        userId: login_session.user.id,
      },
    });

    return NextResponse.json({
      message: "Address items received successfully",
      address,
    });
  } catch (error) {
    console.error("[USER_ADDRESS_POST]", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
