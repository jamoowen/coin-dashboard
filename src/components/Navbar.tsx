'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


import { ArrowBigRight, Home, Menu, X } from 'lucide-react';


interface NavbarProps {

}

const navbarLinks = {
    home: {
        name: 'Home',
        link: '/'
    },


}


const Navbar: FC<NavbarProps> = ({ }) => {
    const [open, setOpen] = useState(false)


    return (
        <nav className="fixed z-30 top-0 left-0 mr-5 font-semibold items-center bg-black flex flex-row w-full text-white shrink-0 bg-background">

            <div className='hidden px-2 py-1 sm:flex  items-center sm:pt-10 flex-row'>
                <Link href="/" className='flex items-center justify-center flex-row gap-2'>
                    <Home /> 
                </Link>



                <div className='ml-5 gap-5  text-slate-200  flex w-full'>
                    {
                        Object.entries(navbarLinks).map(([key, value]) => (
                            <Link
                                key={key}
                                href={value.link}
                                className='hover:underline hover:text-white font-semibold leading-0 underline-offset-4 decoration-underlineColor'

                            >
                                {value.name}
                            </Link>
                        ))
                    }
                </div>

            </div>
            <div className='w-full z-50 px-2 sm:hidden'>
                <div className='grid w-full grid-cols-3 z-10 relative py-4 items-center'>
                    <div className='col-span-1 flex items-center'>

                        <button className=' ' onClick={() => setOpen((x) => !x)}>
                            {!open ? <Menu /> : <X />}
                        </button>
                    </div>

                    <div className='col-span- flex items-center justify-center '>


                        <Link href="/" className='flex items-center justify-center flex-row gap-2'>
                            <Home /> Home
                        </Link>
                    </div>
                </div>

                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-20" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 z-50 right-0 flex max-w-full pl-10">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-in-out duration-500"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in-out duration-500"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="absolute py-4  left-0 top-0  -ml-8 flex pr-2  sm:-ml-10 sm:pr-4">
                                                    <button
                                                        type="button"
                                                        className="relative mt-1 rounded-md  text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className=" -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <X />
                                                    </button>
                                                </div>
                                            </Transition.Child>
                                            <div className="flex  h-full flex-col overflow-y-scroll bg-black text-white  shadow-xl">
                                                <div className="flex mt-14 flex-col">

                                                    <ul>

                                                        {
                                                            Object.entries(navbarLinks).map(([key, value]) => (
                                                                <li key={value.name} className='w-full flex flex-row border-b py-5 px-2 border-gray-500'>
                                                                    <Link
                                                                        key={key}
                                                                        href={value.link}
                                                                        className='hover:underline hover:text-white flex justify-between w-full font-semibold underline-offset-4 decoration-underlineColor'
                                                                        onClick={() => setOpen(false)}
                                                                    >
                                                                        {value.name}
                                                                        <ArrowBigRight className='text-gold' />
                                                                    </Link>

                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="relative mt-6 flex-1 px-4 sm:px-6"></div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

            </div>



        </nav>

    )
}

export default Navbar
