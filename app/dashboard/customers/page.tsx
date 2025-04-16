import { v4 as uuidv4 } from "uuid";
import { people } from "@/app/lib/placeholder-data";
import { getLoginSession } from "@/app/lib/data";

export default async function Page() {
  const session: any = await getLoginSession();
  // console.log("session", session);

  return (
    <>
      <p>Customers Page</p>
      <UUIDPage />
      <ul className="divide-y divide-gray-200">
        <div className="divide-y divide-gray-200"></div>
        <li key={session?.user?.id} className="flex py-4">
          <img
            className="size-10 rounded-full"
            src={session?.user?.image as string}
            alt="Not Found Image"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Name : {session?.user?.name as string}
            </p>
            <p className="text-sm font-medium text-gray-900">
              Role : {session?.user?.roll as string}
            </p>
            <p className="text-sm text-gray-500">
              Email : {session?.user?.email as string}
            </p>
          </div>
        </li>
        <div className="divide-y divide-gray-200"></div>
      </ul>
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
      {/* <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.email} className="flex py-4">
            <img className="size-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
