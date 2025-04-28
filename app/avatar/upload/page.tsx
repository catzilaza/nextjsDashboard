"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  BoxIcon,
  SearchIcon,
  MenuIcon,
} from "lucide-react";

// const SidebarContext = createContext();

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isOpen, setOpen] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const navlink = [
    { href: "/", label: "Home" },
    { href: "/", label: "Product" },
    { href: "/", label: "Explore" },
    { href: "/", label: "Contact" },
  ];

  //https://www.youtube.com/watch?v=qUV2kgYdr9k

  const Navbar: React.FC<{ isSticky: boolean }> = ({ isSticky }) => {
    const [expanded, setExpanded] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    return (
      <>
        <div
          className={`w-full h-auto top-0 left-0 bg-gradient-to-r from-red-200 ${
            isSticky ? "sticky" : "absolute"
          }`}
        >
          <header
            className="flex justify-between items-center text-black
           py-6 px-8 md:px-32 bg-white drop-shadow-md"
          >
            <a href="#" className="flex justify-center items-center">
              <img
                className="w-25 h-10 hover:scale-105 transition-all"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Error Picture"
              />
              Tailwind
            </a>
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
              <li className="p-3 hover:bg-red-400 hover:text-white rounded-md transition-all cursor-pointer">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="p-3 hover:bg-red-400 hover:text-white rounded-md transition-all cursor-pointer">
                Product
              </li>
              <li className="p-3 hover:bg-red-400 hover:text-white rounded-md transition-all cursor-pointer">
                Explore
              </li>
              <li className="p-3 hover:bg-red-400 hover:text-white rounded-md transition-all cursor-pointer">
                Contact
              </li>
            </ul>
            <div className="relative hidden md:flex justify-center items-center gap-3">
              <SearchIcon className="absolute left-3 text-2xl text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="rounded-xl py-2 pl-10 border-2 border-red-300
                 focus:bg-red-100 focus:outline-red-500"
              />
            </div>
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
              <li
                className="p-3 hover:bg-red-400 hover:text-white
               rounded-md transition-all cursor-pointer"
              >
                LogIn
              </li>
              <li
                className="p-3 hover:bg-red-400 hover:text-white
               rounded-md transition-all cursor-pointer"
              >
                SignUp
              </li>
            </ul>

            <MenuIcon
              className="xl:hidden block text-5xl cursor-pointer"
              onClick={() => {
                alert(`isMenuOpen : ${isMenuOpen}`);
                setIsMenuOpen(!isMenuOpen);
              }}
            />

            <div
              className={`absolute xl:hidden top-24
                 left-16 end-full bg-white flex flex-col 
                 items-start gap-6 font-semibold
                 text-lg transform transition-transform ${
                   !isMenuOpen ? "opacity-100" : "opacity-0"
                 }`}
              style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
            >
              <li
                className="list-none min-w-full text-center p-4 hover:bg-red-200 hover:text-white
               transition-all cursor-pointer"
              >
                Home
              </li>
              <li
                className="list-none min-w-full text-center p-4 hover:bg-red-200 hover:text-white
               transition-all cursor-pointer"
              >
                Product
              </li>
              <li
                className="list-none min-w-full text-center p-4 hover:bg-red-200 hover:text-white
               transition-all cursor-pointer"
              >
                Explore
              </li>
              <li
                className="list-none min-w-full text-center p-4 hover:bg-red-200 hover:text-white
               transition-all cursor-pointer"
              >
                Contact
              </li>
            </div>
          </header>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="bg-green-200 min-h-screen w-full flex flex-col justify-center items-center">
        {/* <div className={`${isVisible ? "translate-y-0" : "translate-y-full"}`}>
          
        </div> */}
        <Navbar isSticky={isSticky} />

        <section className="min-h-screen w-full bg-slate-200 flex justify-center items-center">
          SECTION 1
        </section>
        <section className="min-h-screen w-full bg-red-200 flex justify-center items-center">
          SECTION 2
        </section>
        <section className="min-h-screen w-full bg-blue-200 flex justify-center items-center">
          SECTION 3
        </section>
        <section className="min-h-screen w-full bg-white flex justify-center items-center">
          SECTION 4
        </section>
      </section>
    </>
  );
}

{
  /* <section>
<nav className="bg-slate-300 w-full h-80 flex flex-col md:flex-row items-center justify-center">
  <div className="bg-red-200 w-auto h-20 flex flex-col items-center justify-center">
    <div>
      <img
        className="bg-white max-w-min h-20"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
    </div>
  </div>
  <div className="bg-green-200 w-full h-20 flex flex-col items-center justify-center">
    <div>
      <input type="text" placeholder="search" />
    </div>
  </div>
  <div className="bg-blue-200 w-full h-20 flex flex-col items-center justify-center">
    <div className="bg-white">
      <button type="button" className="btn btn-outline-primary">
        button
      </button>
    </div>
  </div>
</nav>
</section>
<div>
<h1>Upload Your Avatar</h1>

<form
  onSubmit={async (event) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `/api/avatar/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    const newBlob = (await response.json()) as PutBlobResult;

    setBlob(newBlob);
  }}
>
  <input name="file" ref={inputFileRef} type="file" required />
  <button type="submit">Upload</button>
</form>
{blob && (
  <div>
    Blob url: <a href={blob.url}>{blob.url}</a>
  </div>
)}
</div> */
}

{
  // function getMenuClasses() {
  //   let menuClasses = [];
  //   if (isOpen) {
  //     menuClasses = [
  //       "flex",
  //       "absolute",
  //       "top-[60px]",
  //       "bg-red-200",
  //       "w-full",
  //       "p-20",
  //       "gap-10",
  //     ];
  //   } else {
  //     menuClasses.push("hidden");
  //   }
  //   return menuClasses.join(" ");
  // }
  // const Navbar = () => {
  //   return (
  //     <nav className="bg-slate-400 text-white p-4 sm:p-6 md:flex md:justify-between md:items-center">
  //       <div className="flex mx-auto justify-between items-center">
  //         <a
  //           href=""
  //           className="hidden md:flex hover:text-red-200 text-2xl font-bold"
  //         >
  //           Ariya
  //         </a>
  //         <div className={`${isOpen ? "flex" : "hidden"} flex-col md:flex-row`}>
  //           <Link href={""} className="hover:text-red-200 mx-2">
  //             Home
  //           </Link>
  //         </div>
  //         <div className="hidden md:flex">
  //           <Link href={""} className="hover:text-red-200 mx-2">
  //             About
  //           </Link>
  //         </div>
  //         <div className="hidden md:flex">
  //           <Link href={""} className="hover:text-red-200 mx-2">
  //             Contact
  //           </Link>
  //         </div>
  //         <div className="md:hidden flex items-center">
  //           <button
  //             onClick={() => {
  //               setOpen(!isOpen);
  //               alert("Click!!!");
  //             }}
  //           >
  //             Click!
  //           </button>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // };
}

{
  /* <aside className="h-screen">
<nav className="h-full flex flex-col bg-slate-300 border-r shadow-sm">
  <div className="w-20 h-40 bg-red-200">
    <img
      className="w-20 h-20"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
      alt="Your Company"
    />
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-20 h-20"
    >
      {" "}
      {expanded ? <ChevronFirst /> : <ChevronLast />}
    </button>
  </div>
  <div className="w-20 h-40 bg-green-200 border-t flex p-3">
    <img
      className="w-20 h-20"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
      alt="Your Avatar"
    />
  </div>
    <div
    className={`h-40 bg-blue-200  flex justify-between items-center overflow-hidden transition-all ${
      !expanded ? "w-52 ml-3" : "w-0"
    }`}
  >
    <div className="leading-4">
      <h4 className="font-semibold">John Doe</h4>
      <span className="text-xs">johndoe@gmail.com</span>
    </div>
    <MoreVertical size={20} />
  </div>
  <div className="border-4 border-darkblue"></div>
  <br />
  <div style={{border: "5px solid darkblue"}}></div>
  <br />
  <div className="border-4 border-blue-400"></div>
</nav>
</aside> */
}
