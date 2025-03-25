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

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Page() {
  return (
    <>
      <p>Customers Page</p>
      <UUIDPage />
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

      {/*Card Skeleton*/}
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="flex p-4">
          <div className="h-5 w-5 rounded-md bg-gray-200" />
          <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
        </div>
        <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
          <div className="h-7 w-20 rounded-md bg-gray-200" />
        </div>
      </div>

      {/*My Card Skeleton*/}
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                <div className="mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <img
                          src="/"
                          className="mr-2 rounded-full"
                          width={50}
                          height={50}
                          alt=""
                        />
                        <p></p>
                      </div>
                      <p className="text-sm text-gray-500"></p>
                    </div>
                    {/* <InvoiceStatus status={product.status} /> */}
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{}</p>
                      <p>{}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden min-w-full text-gray-900 md:table">
                <div className="grid grid-cols-5 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      {/* <img className="w-16 h-16 rounded-full" alt=""  width={50} height={50}/> */}
                      <div className="h-10 w-25 rounded-md bg-gray-200" />

                      <CardDescription>
                        Card Description
                        <p className="text-sm text-gray-500">Name :</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p className="text-xl font-medium"></p>
                          <p></p>
                          <p></p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <p></p>
                          <p></p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                      <div className="card-actions justify-end">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"></button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
