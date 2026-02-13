// import Form from "@/app/ui/invoices/create-form";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import Form from "@/app/dashboard/components/invoices/create-form";
import Breadcrumbs from "@/app/dashboard/components/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/ecommerce/lib/data";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
