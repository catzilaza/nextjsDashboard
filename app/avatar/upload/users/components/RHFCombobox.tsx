import { Label } from "@radix-ui/react-label";
import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  CheckIcon,
  ChevronsUpDown,
  ChevronsUpDownIcon,
} from "lucide-react";
import { Option } from "../types/option";
import { FormControl } from "@/components/ui/form";

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const;

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};
export default function RHFCombobox<T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
  // const [valuettt, setValue] = React.useState("");

  // console.log("RHFCombobox rendered with value:", value);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <>
          <Label>{label}</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? (options ?? []).find((option) => option.label === value)
                      ?.label
                  : `Select framework`}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {(options ?? []).map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.label}
                        onSelect={(currentValue) => {
                          onChange(currentValue === value ? "" : currentValue);
                          // setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.label ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )}
    />
  );
}
