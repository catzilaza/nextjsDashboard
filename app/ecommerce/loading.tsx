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
        <img
          src={"/svg/SvgSpinners6DotsScale.svg"}
          alt=""
          className="h-16 w-16 animate-spin"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-600">Loading...</p>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
