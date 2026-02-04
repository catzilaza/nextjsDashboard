"use server";

import { redirect } from "next/navigation";

export async function signUpAction(form: FormData) {
  const email = form.get("email");
  const password = form.get("password");
  const name = form.get("name");
  console.log("signUpAction email: ", email);
  console.log("signUpAction password: ", password);
  console.log("signUpAction name: ", name);
}

export async function signInAction(form: FormData) {
  const email = form.get("email");
  const password = form.get("password");
  console.log("signInAction email: ", email);
  console.log("signInAction password: ", password);
}

export async function signOutAction(form: FormData) {
  // const data = Object.fromEntries(form.entries()) as Record<
  //   string,
  //   FormDataEntryValue
  // >;
  // const data = form.get("logout");
  // console.log("signOutAction : ", data);
  redirect("/");
}
