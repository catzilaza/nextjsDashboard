import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// type Props<T extends FieldValues> = {
// 	name: Path<T>;
// } & Pick<Label, 'label'>;
type Props<T extends FieldValues> = {
  name: Path<T>;
};

export default function RHFTextField<T extends FieldValues>({
  name,
  ...props
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Label htmlFor="name">{name}</Label>
          <Input
            {...field}
            {...props}
            // aria-invalid={error ? "true" : "false"}
            // error={!!error}
            // helperText={error?.message}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </>
      )}
    />
  );
}
