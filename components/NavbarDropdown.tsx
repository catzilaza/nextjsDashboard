"use client";

//https://www.youtube.com/watch?v=lo_BJ6dl7fw
//https://github.com/whoisseth/dropdown-navigation/blob/master/src/components/Navbar.tsx

import { useState, useRef, useEffect, useContext } from "react";
import todoImage from "@/public/downarrow.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import Image from "next/image";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  BoxIcon,
  SearchIcon,
  MenuIcon,
  ArrowBigDownIcon,
  FileImageIcon,
  LogOutIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

const navItems: NavItem[] = [
  {
    label: "Features",
    link: "#",
    children: [
      {
        label: "Todo list",
        link: "#",
        iconImage: todoImage,
      },
      {
        label: "Calendar",
        link: "#",
        iconImage: todoImage,
      },
      {
        label: "Reminders",
        link: "#",
        iconImage: todoImage,
      },
      {
        label: "Planning",
        link: "#",
        iconImage: todoImage,
      },
    ],
  },
  {
    label: "Compnay",
    link: "#",
    children: [
      {
        label: "History",
        link: "#",
      },
      {
        label: "Our Team",
        link: "#",
      },
      {
        label: "Blog",
        link: "#",
      },
    ],
  },
  {
    label: "Careers",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
];
export default function NavbarDropdown() {
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }
  return (
    <div className="sticky bg-red-200 h-auto top-0 left-0 mx-auto flex  w-full justify-between px-4 py-5 text-sm">
      {/* left side  max-w-7xl*/}
      <section ref={animationParent} className="flex items-center gap-10">
        {/* logo */}
        <Image src={todoImage} width={10} height={70} alt=" logo" />
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((d, i) => (
            <div key={`${d.label}-${i}`} className="relative group">
              <Link
                href={d.link ?? "#"}
                className="relative px-2 py-3 transition-all flex items-center gap-2 text-neutral-400 group-hover:text-black"
              >
                <span>{d.label}</span>
                {d.children && (
                  <ArrowBigDownIcon className="rotate-180 transition-all group-hover:rotate-0" />
                )}
              </Link>

              {/* Dropdown */}
              {d.children && (
                <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
                  {d.children.map((ch, j) => (
                    <div
                      key={`${ch.label}-${j}`}
                      className="flex items-center py-1 pl-6 pr-8"
                    >
                      {ch.iconImage && (
                        <Image
                          src={ch.iconImage}
                          width={10}
                          height={70}
                          alt="item-icon"
                        />
                      )}
                      <Link
                        href={ch.link ?? "#"}
                        className="text-neutral-400 hover:text-black whitespace-nowrap pl-3"
                      >
                        {ch.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* navitems */}
      </section>

      {/* right side data */}
      <section className=" hidden md:flex   items-center gap-8 ">
        <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
          Login
        </button>

        <button className="h-fit rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
          Register
        </button>
      </section>

      <FileImageIcon
        onClick={openSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className=" h-full w-[80%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <LogOutIcon
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl "
          />
        </section>
        <div className="flex flex-col text-base gap-2 transition-all">
          {navItems.map((d, i) => (
            <SingleNavItem
              key={`${d.label}-${i}`}
              label={d.label}
              iconImage={d.iconImage}
              link={d.link}
            >
              {d.children}
            </SingleNavItem>
          ))}
        </div>

        <section className="flex flex-col gap-8 mt-4 items-center">
          {/* h-fit text-neutral-400 transition-all hover:text-black/90 */}
          <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Login
          </button>

          <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </section>
      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <>
      <div ref={animationParent} className="relative">
        <button
          onClick={toggleItem}
          className="relative px-2 py-3 transition-all flex items-center gap-2 text-neutral-400 group-hover:text-black"
        >
          <span>{d.label}</span>
          {d.children && (
            <ArrowBigDownIcon
              className={`text-xs transition-all ${isItemOpen && "rotate-180"}`}
            />
          )}
        </button>

        {/* Dropdown */}
        {isItemOpen && d.children && (
          <div className="w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all flex">
            {d.children.map((ch, i) => (
              <div
                key={`${ch.label}-${i}`}
                className="flex items-center py-1 pl-6 pr-8"
              >
                {ch.iconImage && (
                  <Image
                    src={ch.iconImage}
                    width={10}
                    height={70}
                    alt="item-icon"
                  />
                )}
                <Link
                  href={ch.link ?? "#"}
                  className="text-neutral-400 hover:text-black whitespace-nowrap pl-3"
                >
                  {ch.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

{
  /* <>
<Link  
  ref={animationParent}
  onClick={toggleItem}
  href={d.link ?? "#"}
  className="relative px-2 py-3 transition-all "
>
  <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
    <span>{d.label}</span>
    {d.children && (
      
      <ArrowBigDownIcon
        className={`text-xs transition-all ${
          isItemOpen && " rotate-180"
        }`}
      />
    )}
  </p>
</Link>

{isItemOpen && d.children && (
  <div className="w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all flex">
    {d.children.map((ch, i) => (
      <Link
        key={`${ch.label}-${i}`}
        href={ch.link ?? "#"}
        className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black"
      >
        {ch.iconImage && (
          <Image
            src={ch.iconImage}
            width={10}
            height={70}
            alt="item-icon"
          />
        )}
        <span className="whitespace-nowrap pl-3 ">{ch.label}</span>
      </Link>
    ))}
  </div>
)}
</> */
}
