import React, { useEffect, useState } from "react";
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ userImg, Img, caption, id, username }) {
	const { data: Session } = useSession();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const [likes, setLikes] = useState([]);
	const [hasLikes, sethasLikes] = useState(false);

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "posts", id, "comments"),
					orderBy("timeStamp", "desc"),
				),
				(snapshot) => {
					setComments(snapshot.docs);
				},
			),
		[db, id],
	);

	useEffect(
		() =>
			onSnapshot(collection(db, "posts", id, "likes"), (snapshots) =>
				setLikes(snapshots.docs),
			),
		[db, id],
	);

	useEffect(() => {        
		sethasLikes(
			likes.findIndex((like) => like.id === Session?.user?.uid) !== -1,
		);
	},[likes]);

	const likePost = async () => {
		if (hasLikes) {			
			await deleteDoc(doc(db, "posts", id, "likes", Session?.user.uid));
		} else {
			await setDoc(doc(db, "posts", id, "likes", Session.user.uid), {
				username: Session.user.username,
			});
		}
	};
	
	const sendComment = async (e) => {
		e.preventDefault;
		const commentToSend = comment;

		setComment("");

		await addDoc(collection(db, "posts", id, "comments"), {
			comment: commentToSend,
			username: Session.user.username,
			userImage: Session.user.image,
			timeStamp: serverTimestamp(),
		});
	};
	return (
		<div className='bg-white my-7 border rounded-sm'>
			{/* Header */}
			<div className='flex items-center p-5'>
				<img
					src={userImg}
					alt=''
					className='rounded-full h-12 w-12 object-cover border p-1 '
				/>
				<p className='flex-1 font-bold'>{username}</p>
				<DotsHorizontalIcon className='w-5 h-5' />
			</div>

			{/* Image */}
			<img className='object-cover w-full' src={Img} alt='post image' />

			{/* Buttons */}
			{Session && (
				<div className='flex justify-between px-4 py-4'>
					<div className='flex space-x-4 items-center'>
						{
                            hasLikes ? <HeartIconFilled onClick={likePost} className="btn text-red-600" /> : <HeartIcon className='btn' onClick={likePost} />
                        }
						<ChatIcon className='btn' />
						<PaperAirplaneIcon className='btn' />
					</div>

					<BookmarkIcon className='btn' />
				</div>
			)}

			{/* Caption */}
			<p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className="font-bold mb-1"> {likes.length} likes </p>
                )}
				<span className='font-bold mr-2'> {username} </span>
				{caption}
			</p>

			{/* comments */}
			{comments.length > 0 && (
				<div className='ml-10 h-20 overflow-scroll scrollbar-thin scrollbar-thumb-black'>
					{comments.map((coment) => (
						<div key={coment.id} className='flex flex-center space-x-2 mb-3'>
							<img
								src={coment.data().userImage}
								alt=''
								className='h-7 w-7 rounded-full'
							/>
							<p className='text-sm flex-1'>
								{" "}
								<span className='font-bold'>
									{" "}
									{coment.data().username}{" "}
								</span>{" "}
								{coment.data().comment}{" "}
							</p>
							<Moment fromNow className='pr-5 text-xs'>
								{coment.data().timeStamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}

			{/* inputBox */}
			{Session && (
				<form className='flex items-center mx-4'>
					<EmojiHappyIcon className='h-7 ' />
					<input
						type='text'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className='border-none flex-1 focus:ring-0 outline-none'
						placeholder='Add a comment...'
					/>
					<button
						type='submit'
						disabled={!comment.trim()}
						onClick={sendComment}
						className='font-semibold text-blue-400'
					>
						Post
					</button>
				</form>
			)}
		</div>
	);
}

export default Post;
