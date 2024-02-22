"use client"

import { TradingPairs } from "@/types/coinbase-types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<TradingPairs>[] = [
    {
        accessorKey: "display_name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Token Pair
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
      
    },
    {
        accessorKey: "base_currency",
        header: "Base Currency",
    },
    {
        accessorKey: "quote_currency",
        header: "Quote Currency",
    },
    {
        accessorKey: "id",
        header: "Product ID",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.id

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <a href={`/dashboard?id=${row.original.id}`} >
                            <DropdownMenuItem className="cursor-pointer" >View Token Pair</DropdownMenuItem>
                        </a>
                        {/* <Link href={`/dashboard?id=${row.original.base_currency}`}>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => { console.log(`Base Currency: ${row.original.base_currency}`) }}>View Base Token</DropdownMenuItem>
                        </Link>
                        <Link href={`/dashboard?id=${row.original.quote_currency}`}>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => { console.log(`Quote currency: ${row.original.base_currency}`) }}>View Quote Token</DropdownMenuItem>
                        </Link> */}

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
