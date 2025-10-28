import Form from "@/app/dashboard/ui/products/create-form";
import Breadcrumbs from "@/app/dashboard/ui/invoices/breadcrumbs";
import { fetchProducts_Dessert } from "@/app/lib/data";

export default async function Page() {
  const products = await fetchProducts_Dessert();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Create Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}
