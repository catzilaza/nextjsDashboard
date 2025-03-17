import Form from "@/app/ui/products/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchProducts_DessertById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [product] = await Promise.all([fetchProducts_DessertById(id)]);

  if (!product) {
    notFound();
  } else {
    // console.log("fetchProductById(id) ===> : ", product);
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Edit Product",
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} />
    </main>
  );
}
