import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CustomersTable from "@/app/ui/customers/table";
import { people } from "@/app/lib/placeholder-data";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Page() {
  return (
    <>
      <p>Customers Page</p>
      <UUIDPage />
      {/* <CustomersTable /> */}
    </>
  );
}

function UUIDPage() {
  const uuid = uuidv4();

  return (
    <div>
      <h1>UUID Example</h1>
      <p>นี่คือตัวอย่าง UUID:</p>
      <p>
        <strong>{uuid}</strong>
      </p>
      <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.email} className="flex py-4">
            <img className="size-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>

      {/*Card Skeleton*/}
      {/* <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div> */}
    </div>
  );
}

//Optimistic updates
//https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations

// 'use client'

// import { useOptimistic } from 'react'
// import { send } from './actions'

// type Message = {
//   message: string
// }

// export function Thread({ messages }: { messages: Message[] }) {
//   const [optimisticMessages, addOptimisticMessage] = useOptimistic<
//     Message[],
//     string
//   >(messages, (state, newMessage) => [...state, { message: newMessage }])

//   const formAction = async (formData: FormData) => {
//     const message = formData.get('message') as string
//     addOptimisticMessage(message)
//     await send(message)
//   }

//   return (
//     <div>
//       {optimisticMessages.map((m, i) => (
//         <div key={i}>{m.message}</div>
//       ))}
//       <form action={formAction}>
//         <input type="text" name="message" />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   )
// }

// 'use server'

// import { cookies } from 'next/headers'

// export async function exampleAction() {
//   const cookieStore = await cookies()

//   // Get cookie
//   cookieStore.get('name')?.value

//   // Set cookie
//   cookieStore.set('name', 'Delba')

//   // Delete cookie
//   cookieStore.delete('name')
// }
