import type { Metadata } from 'next'
import { Inter, Playfair_Display, PT_Serif, Roboto_Slab } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
const fontPlayFair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const fontPtSerif = PT_Serif({ subsets: ['latin'], weight:'400', variable: '--font-pt-serif' })
const fontRobotoSlab = Roboto_Slab({subsets: ['latin'], variable: '--font-roboto-slab'})

export const metadata: Metadata = {
  title: 'Coin Dashboard',
  description: 'Live crypto trading dashboard and coin information',
}

export const revalidate = 20;


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontPlayFair.variable} ${fontPtSerif.variable} ${fontRobotoSlab.variable}`}>

        <body className="bg-black min-h-screen w-full pt-10 text-white font-robot-slab">
          <Navbar />
          {children}
          </body>
      
    </html>
  )
}
