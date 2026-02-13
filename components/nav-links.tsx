"use client";

import {
  UserGroupIcon,
  HomeIcon,
  ChartBarSquareIcon,
  IdentificationIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
  NumberedListIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SVGProps } from "react";

type LinkItem = {
  name: string;
  href?: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  // icon?: any;
  children?: LinkItem[];
};

const links: LinkItem[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    children: [
      {
        name: "Todo list",
        href: "/blog",
        icon: ArrowRightIcon,
      },
      {
        name: "Calendar",
        href: "#",
        icon: ArrowRightIcon,
      },
      {
        name: "Reminders",
        href: "#",
        icon: ArrowRightIcon,
      },
      {
        name: "Planning",
        href: "#",
        icon: ArrowRightIcon,
      },
    ],
  },
  { name: "ecommerce", href: "/ecommerce", icon: NumberedListIcon },
  { name: "Dashboard", href: "/dashboard", icon: ChartBarSquareIcon },
  { name: "Blog", href: "/blog", icon: UserGroupIcon },
  { name: "Dropbox", href: "/dropbox", icon: DocumentArrowDownIcon },
  {
    name: "AI File Analyzer",
    href: "/aifileanalyzer",
    icon: MagnifyingGlassCircleIcon,
  },
  { name: "BetterAuth", href: "/betterauth", icon: IdentificationIcon },
  // {
  //   name: "Invoices",
  //   href: "/dashboard/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href || "#"}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              },
            )}
          >
            {LinkIcon && <LinkIcon className="w-6" />}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <Link
//             key={link.name}
//             href={link.href || "#"}
//             className={clsx(
//               "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
//               {
//                 "bg-sky-100 text-blue-600": pathname === link.href,
//               }
//             )}
//           >
//             {LinkIcon && <LinkIcon className="w-6" />}
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }

// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <div className="hidden md:flex items-center gap-4 transition-all">
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <div key={link.name} className="relative group">
//             <Link
//               key={link.name}
//               href={link.href || "#"}
//               className={clsx(
//                 "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
//                 {
//                   "bg-sky-100 text-blue-600": pathname === link.href,
//                 }
//               )}
//             >
//               {LinkIcon && (
//                 <LinkIcon className="rotate-180 transition-all group-hover:rotate-0" />
//               )}
//               <p className="hidden md:block">{link.name}</p>
//             </Link>
//             {link.children && (
//               <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
//                 {link.children.map((ch, j) => (
//                   <div key={j} className="flex items-center py-1 pl-6 pr-8">
//                     <Link
//                       key={j}
//                       href={ch.href || "#"}
//                       className="text-neutral-400 hover:text-black whitespace-nowrap pl-3"
//                     >
//                       {ch.icon && <ch.icon className="w-6" />}
//                       <p className="hidden md:block">{ch.name}</p>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
