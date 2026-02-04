import MembersTable from "@/app/betterauth/components/MembersTable";
import AllUsers from "@/app/betterauth/components/AllUsers";
import { getOrganizationBySlug } from "@/app/betterauth/actions/organizations";
import { getUsers } from "@/app/betterauth/actions/users";

type Params = Promise<{ slug: string }>;

export default async function OrganizationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const decodedSlug = slug ? decodeURIComponent(slug as string) : "";
  const organization = await getOrganizationBySlug(decodedSlug);

  const users = await getUsers(organization?.id || "");

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 py-10">
      <h1 className="font-bold text-2xl">{organization?.name}</h1>
      <MembersTable members={organization?.members || []} />
      <AllUsers organizationId={organization?.id || ""} users={users} />
    </div>
  );
}
