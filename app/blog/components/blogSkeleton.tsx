// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function BlogSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        !.......Loading BlogSkeleton
        <div className="mt-[30px] rounded-xl">
          <h1 className="w-5 h-4 bg-slate-200 rounded-sm text-[40px] font-light xl:text-[72px]"></h1>
          <div className="w-5 h-4 bg-slate-200 rounded-md flex mt-[60px] gap-[50px] items-center">
            <div className="w-10 h-8 bg-slate-200 rounded-md relative flex-1 height-[500px]"></div>
            <div className="w-14 h-12 bg-slate-200 rounded-md flex flex-col flex-1 gap-[20px]">
              <h1 className="w-5 h-4 bg-slate-200 rounded-sm font-[30px]"></h1>
              <p className="w-5 h-4 bg-slate-200 rounded-sm font-light"></p>
              <button className="h-4 bg-slate-200  px-5 py-4 rounded-md w-max">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
