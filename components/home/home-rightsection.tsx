import Image from "next/image";

const homerightsection = () => {
  return (
    <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-6">
      <Image
        src={"/hero-desktop.png"}
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
        priority
      />
      <Image
        src={"/hero-mobile.png"}
        priority
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
  );
};

export default homerightsection;
