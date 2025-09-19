import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

export default function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleGroup variant="outline" type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    ></Controller>
  );
}
