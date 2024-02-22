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



            <div className=' p-2 sm:p-5 bg-blend-color gap-5 justify-center items-center flex flex-col  opacity  min-h-screen  grow '>
            <span className='text-4xl sm:text-7xl cursor-default mt-10 text-white'>Coin Explorer</span>
            <div className="flex w-[350px] flex-col text-white sm:w-[450px] whitespace-pre-line gap-5 ">
            This app connects to the Coinbase Sandbox API, which allows testing of Coinbase API endpoints and trading on a Testnet.
            The Token pairs below can be clicked on using the 3 dots and their live pricing data alongside a chart is displayed. 
            <span className="text-xs text-gray-300">
            *Some Pairs do not have live pricing data available and others have strange price fluctuations due to the nature of 
            the testnet. 
            </span>
            </div>
            
              
             {
              Object.keys(data[0]).length < 4? JSON.stringify(data) : 
              <DataTable columns={columns} data={data} />
              

             }
          
            </div>
  

    </main>
  );
}
