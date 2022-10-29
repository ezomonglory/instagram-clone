import React, { useEffect, useState } from 'react'
import { faker } from "@faker-js/faker";

function Suggestions() {
    const [fakeData, setFakeData] = useState([])

    useEffect(()=> {
        let Suggestions = [...Array(5).fill(null).map(()=> ({
            avatar: faker.image.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.name(),
        }))]  

        setFakeData(Suggestions)
    },[])


  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-xs mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='text-gray-600 font-semibold cusrsor-pointer'>See All</button>
        </div>

        {fakeData.map((profile, i)=> (
            <div key={i} className="flex items-center justify-between mt-3">
                <img src={profile.avatar} className="w-10 h-10 rounded-full border p-[2px]" />

                <div className='flex-1 ml-4'>
                    <h2 className='font-semibold text-sm'> {profile.firstName} </h2>
                    <h3 className='text-gray-400 text-sm'>Works at {profile.company} </h3>
                </div>

                <button className='text-blue-400 text-xs font-bold' >Follow</button>
            </div>
        ))}
    </div>
  )
}

export default Suggestions