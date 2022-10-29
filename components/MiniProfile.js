import React from 'react'
import {signOut, useSession} from "next-auth/react"

function MiniProfile() {
    const {data: session} = useSession()

    console.log(session)
  return (
    <div className='flex items-center mt-14 ml-10 justify-between'>
        <img src={session?.user?.image} className='rounded-full p-[2px] object-cover w-16 h-16' />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
        </div>

        <button className='text-blue-400 font-semibold' onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default MiniProfile