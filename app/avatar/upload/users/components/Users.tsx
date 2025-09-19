import React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, Schema } from "../types/schema";
import RHFTextField from "./RHFTextField";
import RHFCombobox from "./RHFCombobox";
import RHFToggleButtonGroup from "./RHFToggleButtonGroup";
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
import { cn } from "@/lib/utils";

export const data = {
  states: [
    {
      id: "1",
      label: "California",
    },
    {
      id: "2",
      label: "Texas",
    },
    {
      id: "3",
      label: "Florida",
    },
  ],
  languages: [
    {
      id: "1",
      label: "English",
    },
    {
      id: "2",
      label: "Germany",
    },
    {
      id: "3",
      label: "Spanish",
    },
  ],
  genders: [
    {
      id: "1",
      label: "Male",
    },
    {
      id: "2",
      label: "Female",
    },
  ],
  skills: [
    {
      id: "1",
      label: "Productive",
    },
    {
      id: "2",
      label: "Creative",
    },
    {
      id: "3",
      label: "Agile",
    },
    {
      id: "4",
      label: "Problem solver",
    },
  ],
  users: [
    {
      email: "james@gmail.com",
      formerEmploymentPeriod: [
        "Thu Jan 18 2024 01:06:58 GMT+0330 (Iran Standard Time)",
        "Thu Jan 18 2024 01:06:58 GMT+0330 (Iran Standard Time)",
      ],
      name: "David",
      gender: "1",
      languagesSpoken: ["1", "2"],
      registrationDateAndTime:
        "Thu Jan 18 2024 01:06:58 GMT+0330 (Iran Standard Time)",
      salaryRange: [0, 2000],
      skills: ["1", "2"],
      states: ["1", "2"],
      isTeacher: true,
      students: [
        {
          name: "1111",
        },
        {
          name: "2222",
        },
      ],
      id: 1,
    },
    {
      email: "Robert@gmail.com",
      formerEmploymentPeriod: [
        "Wed Aug 09 2023 00:00:00 GMT+0330 (Iran Standard Time)",
        "Thu Jan 18 2024 01:20:23 GMT+0330 (Iran Standard Time)",
      ],
      name: "Robert",
      gender: "2",
      languagesSpoken: ["1", "2", "3"],
      registrationDateAndTime:
        "Wed Jan 07 1981 04:40:23 GMT+0330 (Iran Standard Time)",
      salaryRange: [67, 87],
      skills: ["1", "2"],
      states: ["3"],
      isTeacher: true,
      students: [
        {
          name: "fsdfdsf",
        },
        {
          name: "sdfsfsf",
        },
        {
          name: "sfdsfsf",
        },
      ],
      id: 2,
    },
    {
      email: "john@gmail.com",
      formerEmploymentPeriod: [
        "Sat Jan 20 2024 18:12:01 GMT+0330 (Iran Standard Time)",
        "Sat Jan 20 2024 18:12:01 GMT+0330 (Iran Standard Time)",
      ],
      name: "John",
      gender: "1",
      languagesSpoken: ["1", "2"],
      registrationDateAndTime:
        "Sat Jan 20 2024 18:12:01 GMT+0330 (Iran Standard Time)",
      salaryRange: [0, 2000],
      skills: ["1", "2"],
      states: ["1"],
      isTeacher: true,
      students: [
        {
          name: "sdsd",
        },
      ],
      id: 3,
    },
  ],
};

const states = [
  {
    id: "1",
    label: "California",
  },
  {
    id: "2",
    label: "Texas",
  },
  {
    id: "3",
    label: "Florida",
  },
];

const statesQuery = { data: data.states };
// const options = statesQuery.data;
// const options = states;

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

// z.infer<typeof FormSchema>
export default function Users() {
  // const { watch, control, unregister, reset, setValue, handleSubmit } =
  //   useFormContext<Schema>();
  const form = useFormContext<any>();

  const { control } = useFormContext();
  // const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form submitted with data:", data);
  };

  // console.log("Users rendered with form data:", statesQuery.data);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormControl>
                      <RHFTextField<Schema> name={field.name} />
                    </FormControl>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  {/* <Label htmlFor="password">Email</Label> */}
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormControl>
                      <RHFTextField<Schema> name={field.name} />
                    </FormControl>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center"></div>
              <FormField
                control={form.control}
                name="states"
                render={({ field }) => (
                  <FormControl>
                    <RHFCombobox<Schema>
                      name={field.name}
                      label={field.name}
                      options={statesQuery.data}
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="grid gap-2 mt-5">
              <div className="flex items-center"></div>
              <FormField
                control={form.control}
                name="languagesSpoken"
                render={({ field }) => (
                  <FormControl>
                    <RHFToggleButtonGroup<Schema>
                      name={field.name}
                      label={field.name}
                    />
                  </FormControl>
                )}
              />
            </div>

            <div className="flex-col mt-12 gap-2">
              <Button type="submit" className="w-full">
                send
              </Button>
              <Button
                onClick={() => {
                  form.reset(defaultValues);
                }}
                variant="outline"
                className="w-full mt-6"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter> */}
    </Card>
  );
}

// <div className="grid gap-2">
//   <div className="flex items-center"></div>
//   <FormField
//     control={form.control}
//     name="states"
//     render={({ field }) => (
//       <FormItem className="flex flex-col">
//         <FormLabel>Language</FormLabel>
//         <Popover>
//           <PopoverTrigger asChild>
//             <FormControl>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 className={cn(
//                   "w-[200px] justify-between",
//                   !field.value && "text-muted-foreground"
//                 )}
//               >
//                 {field.value
//                   ? options.find(
//                       (option) => option.label === field.value
//                     )?.label
//                   : "Select language"}
//                 <ChevronsUpDown className="opacity-50" />
//               </Button>
//             </FormControl>
//           </PopoverTrigger>
//           <PopoverContent className="w-[200px] p-0">
//             <Command>
//               <CommandInput
//                 placeholder="Search framework..."
//                 className="h-9"
//               />
//               <CommandList>
//                 <CommandEmpty>No framework found.</CommandEmpty>
//                 <CommandGroup>
//                   {options.map((option) => (
//                     <CommandItem
//                       value={option.label}
//                       key={option.id}
//                       onSelect={() => {
//                         form.setValue("states", option.label);
//                       }}
//                       // onSelect={(currentValue) => {
//                       //   form.setValue("states", option.label);
//                       //   field.onChange(
//                       //     currentValue === value ? "" : currentValue
//                       //   );
//                       //   setValue(
//                       //     currentValue === value ? "" : currentValue
//                       //   );
//                       //   setOpen(false);
//                       // }}
//                     >
//                       {option.label}
//                       <Check
//                         className={cn(
//                           "ml-auto",
//                           option.label === field.value
//                             ? "opacity-100"
//                             : "opacity-0"
//                         )}
//                       />
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//         <FormDescription>
//           This is the language that will be used in the dashboard.
//         </FormDescription>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// </div>
