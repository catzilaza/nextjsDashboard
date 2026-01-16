import AcmeLogo from "@/app/dashboard/components/acme-logo";
import Carousel from "../carousel";

const homeheader = () => {
  return (
    <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
      <AcmeLogo />
      {/* <Carousel /> */}
    </div>
  );
};

export default homeheader;
