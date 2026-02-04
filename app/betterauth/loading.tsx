import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <SpinnerImageSVG />
    </div>
  );
}

function SpinnerImageSVG() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        {/* <img
          src={"/svg/SvgSpinners6DotsScale.svg"}
          alt=""
          className="h-16 w-16 animate-spin"
          aria-hidden="true"
        /> */}
        <Image
          src="/svg/SvgSpinners6DotsScale.svg"
          alt="Loading spinner"
          width={64} // เท่ากับ h-16 (16 * 4px = 64px)
          height={64} // เท่ากับ w-16
          className="animate-spin"
          aria-hidden="true"
          unoptimized
        />

        <p className="text-sm text-gray-600">Loading...</p>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
