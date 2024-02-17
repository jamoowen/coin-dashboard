import { fetchProductCandles } from "@/lib/services/coinbaseRestRequests"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
  
    const res = await fetchProductCandles(id)
    const data = await res.json()
   
    return Response.json({ data })
  }
  