import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Users from "./Users";
import { patterns, schema, Schema, defaultValues } from "../types/schema";

export default function UsersProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      {/* <DevTool control={methods.control} /> */}
    </FormProvider>
  );
}
