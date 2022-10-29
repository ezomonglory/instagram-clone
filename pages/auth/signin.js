import React from "react";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

//Browser
function signIn({ providers }) {
	return (
		<>
			<Header />
			<div className=" flex flex-col items-center justify-center py-2 min-h-screen  px-14">
                <img src="https://links.papareact.com/ocw " className="w-80"/>
                <p className="font-xs italic">
                    This is not a REAL APP it's just a personal project built by Ezomon Glory with the help of <a target="_blank" className="underline" href="https://www.instagram.com/ssssangha/">sonny sangha</a>
                </p>
                <p className="fond-bold">
                    Only the signIn, signOut, likes, Upload and comment functionalities was implemented
                </p>
				<div className="mt-40">
					{Object.values(providers).map((provider) => (
						<div key={provider.name} className=''>
							<button
								className='bg-blue-500 rounded-lg text-white p-3'
								onClick={() => signIntoProvider(provider.id, {callbackUrl:"/"})}
							>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

//Middle server nextjs server
export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

export default signIn;
