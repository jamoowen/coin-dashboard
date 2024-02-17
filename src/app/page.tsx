import { columns } from "@/components/trading-pairs-table/columns";
import { DataTable } from "@/components/trading-pairs-table/data-table";
import { fetchTradingPairs } from "@/lib/services/coinbaseRestRequests"
import { TradingPairs } from "@/types/coinbase-types";
import Image from "next/image";
// Page({ params, searchParams })
// if url he localhost:3000/dashboard/?stock=ETH -----
// then you can access it via searchParams.stock

export default async function Page() {


  let data: TradingPairs[]  = await fetchTradingPairs()


  return (
    <main className="h-full flex  flex-col overflow-hidden min-h-screen ">


      <div className='grid grid-cols-3  w-full  gap-1 '>

        <div className='col-span-3 items-center w-full  flex justify-center '>

          <div className='  w-full flex'>

            <div className='  p-5 bg-blend-color gap-5 items-center flex flex-col  opacity  min-h-screen  grow '>
            <span className='text-4xl sm:text-7xl cursor-default mt-10 text-white'>Coin Explorer</span>
              
             {
              Object.keys(data[0]).length < 4? JSON.stringify(data) : 
              <DataTable columns={columns} data={data} />
              

             }
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
