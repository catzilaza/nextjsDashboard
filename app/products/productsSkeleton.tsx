import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function ProductsSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
      >
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                <div className="mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="mr-2 rounded-full w-[50px] h-[50px]"></div>
                        <p></p>
                      </div>
                      <p className="text-sm text-gray-500"></p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{}</p>
                      <p>{}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden min-w-full text-gray-900 md:table">
                <div className="grid grid-cols-5 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      {/* <img className="w-16 h-16 rounded-full" alt="" /> */}
                      <div className="h-10 w-25 rounded-md bg-gray-200" />

                      <CardDescription>
                        Card Description
                        <p className="text-sm text-gray-500">Name :</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p className="text-xl font-medium"></p>
                          <p></p>
                          <p></p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <p></p>
                          <p></p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                      <div className="card-actions justify-end">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"></button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
