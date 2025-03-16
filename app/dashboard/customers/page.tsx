import { v4 as uuidv4 } from "uuid";

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
    </div>
  );
}
