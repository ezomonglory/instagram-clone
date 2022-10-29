import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
    const {data:Session} = useSession()
	const [fakeData, setFakeData] = useState([])

    useEffect(()=> {
        let Suggestions = [...Array(20).fill(null).map(()=> ({
            avatar: faker.image.avatar(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        }))]  

        setFakeData(Suggestions)
    },[])
    
	return (
        <div className="flex space-x-2 mt-8 border-gray-200 border rounded-sm overflow-x-scroll p-6 scrollbar-thin scrollbar-thumb-black">  

            {Session && (
                <Story img={Session.user.image} username={Session.user.username} />
            )}

            {fakeData.map((profile, i)=> (
                <Story key={i} img={profile.avatar} username={profile.firstName + " " + profile.lastName} />
            ))}
        </div>
    );
}

export default Stories;
