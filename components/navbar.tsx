import Link from "next/link";
// import NavLinks from "@/app/ui/nav-links";
import NavLinks from "@/components/nav-links";
import {
  ArrowRightIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

const Navbar = async () => {
  return (
    <div className="flex h-20 flex-row px-3 py-1 md:px-2">
      <div className="flex space-x-2">
        <NavLinks />
        <Link
          href="/signup"
          className="flex h-[48px] w-auto grow items-center justify-center gap-2 rounded-md bg-blue-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <span>Sign up</span> <IdentificationIcon className="w-5 md:w-6" />
        </Link>
        <Link
          href="/login"
          className="flex h-[48px] w-auto grow items-center justify-center gap-2 rounded-md bg-blue-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
