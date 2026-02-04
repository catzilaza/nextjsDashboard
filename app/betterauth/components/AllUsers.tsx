"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "../lib/betterauth/auth-client";
import { Button } from "@/components/ui/button";
import type { User } from "../lib/db/schema";
import { addMember } from "../actions/members";

interface AllUsersProps {
  users: User[];
  organizationId: string;
}
// interface AllUsersProps {
//   users: User[];
// }

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // console.log("From /betterauth/components/AllUsers +++++ : ");
  // console.log("users ++++ : ", users);
  // console.log("organizationId : ", organizationId);

  const handleInviteMember = async (user: User) => {
    // try {
    //   setIsLoading(true);
    // const { error } = await authClient.organization.inviteMember({
    //   email: user.email,
    //   role: "member",
    //   organizationId,
    // });

    //   if (error) {
    //     toast.error(error.message);
    //     return;
    //   }

    //   setIsLoading(false);
    //   toast.success("Invitation sent to member");
    //   router.refresh();
    // } catch (error) {
    //   toast.error("Failed to invite member to organization");
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      setIsLoading(true);
      await addMember(organizationId, user.id as string, "member");
      setIsLoading(false);
      toast.success("Member add from organization");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add member from organization");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div key={user.id}>
            <Button
              disabled={isLoading}
              onClick={() => handleInviteMember(user)}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `Invite ${user.name} to organization`
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
