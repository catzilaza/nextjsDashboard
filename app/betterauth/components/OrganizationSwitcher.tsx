"use client";

import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Organization } from "../lib/db/schema";
import { authClient } from "../lib/betterauth/auth-client";
import { useEffect, useState } from "react";

interface OrganizationSwitcherProps {
  organizations: Organization[];
}

export default function OrganizationSwitcher({
  organizations,
}: OrganizationSwitcherProps) {
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const { data: activeOrganization } = authClient.useActiveOrganization();

  useEffect(() => {
    if (activeOrganization?.id) {
      setSelectedOrg(activeOrganization.id);
    }
  }, [activeOrganization]);

  const handleChangeOrganization = async (organizationId: string) => {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId,
      });

      if (error) {
        console.error(error);
        toast.error("Failed to switch organization");
        return;
      }
      setSelectedOrg(organizationId);
      toast.success("Organization switched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to switch organization");
    }
  };

  return (
    <Select onValueChange={handleChangeOrganization} value={selectedOrg}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((organization) => (
          <SelectItem key={organization.id} value={organization.id}>
            {organization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
