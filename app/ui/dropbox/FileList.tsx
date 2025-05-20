"use client";

import FileTabs from "./FileTabs";
import FileActionButtons from "./FileActionButtons";
import FileEmptyState from "./FileEmptyState";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FileListProps {
  userId: string;
  refreshTrigger?: number;
  onFolderChange?: (folderId: string | null) => void;
}

export default function FileList({
  userId,
  refreshTrigger = 0,
  onFolderChange,
}: FileListProps) {
  const filteredFiles = "this is a book";
  return (
    <div className="space-y-6">
      {/* Tabs for filtering files */}
      <FileTabs />

      {/* Folder navigation */}
      {/* {activeTab === "all" && (
        <FolderNavigation
          folderPath={folderPath}
          navigateUp={navigateUp}
          navigateToPathFolder={navigateToPathFolder}
        />
      )} */}

      {/* Action buttons */}
      <FileActionButtons
      // activeTab={activeTab}
      // trashCount={trashCount}
      // folderPath={folderPath}
      // onRefresh={fetchFiles}
      // onEmptyTrash={() => setEmptyTrashModalOpen(true)}
      />

      <Separator className="my-4" />

      {/* Files table */}
      {filteredFiles.length === 0 ? (
        <>{/* <FileEmptyState activeTab={activeTab} /> */}</>
      ) : (
        <>
          <Card className="border bg-slate-50 overflow-hidden">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table
                  aria-label="Files table"
                  // isStriped
                  color="default"
                  // selectionMode="none"
                  className="min-w-full"
                >
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Size
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Added
                      </TableHead>
                      <TableHead className="w-[240px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-center">$250.00</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </>
      )}

      {/* Delete confirmation modal */}
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure Confirm Permanent Deletion?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this file?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Empty trash confirmation modal */}
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>"Empty Trash?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to empty the trash?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
