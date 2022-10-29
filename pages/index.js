import Head from "next/head";
import React from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

function index() {
	return (
		<div className="bg-gray-50 overflow-y-scroll scrollbar-hide">
			<Head>
                <title>Instagram-clone </title>
            </Head>
			
            {/* HEADER */}
            <Header />


            {/* FEED */}
            <Feed/>

            {/* MODAL */}
            <Modal/>
		</div>
	);
}

export default index;
