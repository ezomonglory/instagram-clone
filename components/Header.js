import React from "react";
import Image from "next/image";
import {
	SearchIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon,
	PaperAirplaneIcon,
	MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {modalState} from "../atoms/modalAtom"

function Header() {
	const { data: session } = useSession();
    const router = useRouter() 

    const [open, setOpen] = useRecoilState(modalState)

	return (
		<div className='shadow-sm border-b bg-white p-2 fixed w-full top-0 z-50'>
			<div className='flex justify-between max-w-6xl lg:mx-auto mx-5 items-center'>
				{/* Left */}
				<div className='relative w-24 h-12 hidden lg:inline-grid cursor-pointer' onClick={()=> {
                    router.push("/")
                }}>
					<Image
						src='https://links.papareact.com/ocw'
						layout='fill'
						objectFit='contain'
					/>
				</div>

				<div className='relative w-10 h-10 flex-shrink-0 lg:hidden cursor-pointer' onClick={()=> {
                    router.push("/")
                }}>
					<Image
						src='https://links.papareact.com/jjm'
						layout='fill'
						objectFit='contain'
					/>
				</div>

				{/* middle [Search input div]*/}
				<div className='md:flex gap-2 items-center hidden  rounded-md  p-2 bg-gray-50 border-gray-200 border'>
					<div>
						<SearchIcon className='h-5 w-5 text-gray-600 pointer-events-none' />
					</div>
					<input
						placeholder='Search'
						className='bg-transparent focus:border-black outline-none w-full'
					/>
				</div>

				{/* rigth */}
				<div className='flex items-center justify-center space-x-4'>
					<HomeIcon className='navBtn' onClick={()=> {
                    router.push("/")
                }} />
					<MenuIcon className='h-6 md:hidden cursor flex-shrink-0' />

					{session ? (
						<>
							<div className='relative navBtn'>
								<div className='absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 flex items-center justify-center animate-pulse rounded-full'>
									3
								</div>
								<PaperAirplaneIcon className='navBtn rotate-45' />
							</div>
							<PlusCircleIcon onClick={()=> setOpen(true)} className='navBtn' />
							<UserGroupIcon className='navBtn' />
							<HeartIcon className='navBtn' />
							<img
                            onClick={signOut}
								src={session.user.image}
								className='rounded-ful w-10 h-10 rounded-full flex-shrink-0 cursor-pointer'
							/>
						</>
					) : (
						<button onClick={signIn}>Sign In</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
