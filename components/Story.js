import React from 'react'

function Story({img, username}) {    
  return (
    <div className=''>        
        
        <img src={img} alt="image" className='p-[1.5px] h-14 w-14 rounded-full border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition-all transform duration-200 ease-out'  />
        
        <p className='w-14 truncate text-center '>{username}</p>
    </div>
  )
}

export default Story