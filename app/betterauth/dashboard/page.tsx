"use server";

import Link from "next/link";
import CreateOrganizationForm from "../components/CreateOrganizationForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOrganizations } from "../actions/organizations";
import { getCurrentUser } from "../actions/users";

export default async function DashboardPage() {
  const current_user = await getCurrentUser();
  const organizations = await getOrganizations();

  // if (current_user == null) {
  //   throw new Error("From /betterauth/dashboard/page Something Wrong!!!");
  // }
  // console.log("DashboardPage : ========");
  // console.log("Organizations : ========", organizations);
  // console.log("Current User : ========", current_user);
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Organization</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Create a new organization to get started.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog>
      {current_user ? (
        <div>
          <h4>UserName: {current_user.user.name}</h4>
          <h4>Get Organization: </h4>
          {organizations.map((organization) => (
            <h5 key={organization.id}>
              <p>organization.name: {organization.name}</p>
              <p> organization.slug: {organization.slug}</p>
            </h5>
          ))}
        </div>
      ) : (
        <div>
          <h4>Someting Wrong!!!</h4>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Organizations</h2>
        {organizations.map((organization) => (
          <Button asChild key={organization.id} variant="outline">
            <Link
              href={`/betterauth/dashboard/organization/${organization.slug}`}
            >
              {organization.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
