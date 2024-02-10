import { fetchTradingPairs } from "@/lib/services/fetchTradingPairs";
import Image from "next/image";
// Page({ params, searchParams })
// if url he localhost:3000/dashboard/?stock=ETH -----
// then you can access it via searchParams.stock

export default async function Page() {



  let data  = await fetchTradingPairs()


  return (
    <main className="h-full flex  flex-col overflow-hidden min-h-screen ">


      <div className='grid grid-cols-3  w-full  gap-1 '>

        <div className='col-span-3 items-center w-full mt-10 px-5 flex justify-center '>

          <div className='  w-full flex'>

            <div className=' bg-gray-700 bg-blend-color items-center justify-center flex flex-col  opacity  h-screen  grow '>
              <span className='text-4xl sm:text-7xl cursor-default hover:font-bold font-heading  top-10 text-white'>Coin Explorer</span>
             {JSON.stringify(data)}
              {/* {data.map((coin)=> (
                <li id="coin">{JSON.stringify(coin)}</li>
              ))} */}
            </div>
          </div>
        </div>
        

        




      </div>

    </main>
  );
}
