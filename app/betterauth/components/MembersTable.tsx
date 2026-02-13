import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Member, Role, User, Organization } from "../lib/db/schema";
import MembersTableAction from "./MembersTableAction";

interface MembersTableProps {
  members: any[];
}

export default function MembersTable({ members }: MembersTableProps) {
  // console.log("From /betterauth/components/MembersTable +++++ : ");
  // console.log("MembersTable +++++ : ", members);

  return (
    <Table>
      <TableCaption>A list of organization members.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.users?.name}</TableCell>
            <TableCell>{member.users?.email}</TableCell>
            <TableCell>{member.role as Role}</TableCell>
            <TableCell className="text-right">
              <MembersTableAction memberId={member.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
