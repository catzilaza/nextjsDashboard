import { CloudUpload } from "lucide-react";
import DashboardContent from "@/app/ui/dropbox/DashboardContent";

export default function DropBoxPage() {
  const userId = "user001";

  // const { userId } = await auth();
  // const user = await currentUser();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // Serialize the user data to avoid passing the Clerk User object directly
  // const serializedUser = user
  //   ? {
  //       id: user.id,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       imageUrl: user.imageUrl,
  //       username: user.username,
  //       emailAddress: user.emailAddresses?.[0]?.emailAddress,
  //     }
  //   : null;
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar user={serializedUser} /> */}
      <main className="flex-1 container mx-auto py-8 px-6">
        {/* <DashboardContent
          userId={userId}
          userName={
            user?.firstName ||
            user?.fullName ||
            user?.emailAddresses?.[0]?.emailAddress ||
            ""
          }
        /> */}
        <DashboardContent userId={userId} userName={"Ariya"} />
      </main>

      <footer className="bg-gray-50 border-t-2 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Droply</h2>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} Droply</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
