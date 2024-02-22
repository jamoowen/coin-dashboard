
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {


    return (
        <main className="h-full flex  flex-col overflow-hidden min-h-screen ">


            <div className='grid grid-cols-3  w-full  gap-1 '>

                <div className='col-span-3 items-center w-full  flex justify-center '>

                    <div className='  w-full flex'>

                        <div className='  p-5 bg-blend-color gap-5 items-center flex flex-col  opacity  min-h-screen  grow '>
                            <span className='text-4xl sm:text-7xl cursor-default mt-10 text-white'>Coin Explorer</span>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                            <Skeleton className="h-[400px] w-full rounded-xl" />

                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}
