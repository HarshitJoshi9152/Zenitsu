import { useRef } from "react";
// import randomColor from "randomcolor";
import palx from "palx";
import Collapsible from "react-collapsible";
import LoadMoreComments from "./LoadMoreComments.js";
import "./Comment.css";

import { BiUpvote } from "react-icons/bi";
import Award from "./Award.js";

import { makeFriendly, elapsedTime } from "./../utils/num.js";
import { convertHTMLEntity } from "./../utils/htmlparsing.js";
// import ProfilePic from "./ProfilePic.js";

// returns  each with 10 colors
const colors = palx("grey");
// to get darker colors earlier.
colors.gray = colors.gray.slice(4);

const Comment = ({
	data,
	ml = 0,
	topLevel = false,
	getComments,
	perma_link,
	setCurrentComments,
	level = 0
}) => {
	const icon = {
		width: "16px",
		height: "16px",
		paddingLeft: "2px"
		/* to align score with other comment details */
		// position: "relative",
		// top: "-1px"
	};
	// Comment is a recursive component.
	const mlinc = 0;
	const marginLeft = {
		marginLeft: `${14}px`
	};
	let c =
		colors.gray[
			level > colors.gray.length - 1 ? colors.gray.length - 1 : level
		];
	const commentMarginLeft = {
		marginLeft: `${14}px`,
		"--color": c
	};
	let className = topLevel ? "toplevel-comment" : "comment";
	let timeCreated = +`${data.created_utc}000`;
	const com = useRef();
	// console.log({
	// 	name: data.author,
	// 	date: +`${data.created_utc}000`,
	// 	ago: elapsedTime(+`${data.created_utc}000`)
	// });
	// onClick={() => com.current.setAttribute("style", "display:none")}
	const d = (
		<p style={marginLeft} className="comment-details">
			{/*<ProfilePic id={data.author}></ProfilePic>*/}
			<span className="userID">{`u/${data.author}`}</span>
			<span className="score">
				<BiUpvote alt="arrow-up" style={icon} className="arrow" />
				{/*data.score == 1 means that its hidden*/}
				{data.score > 1 && makeFriendly(data.score)}
			</span>
			<span className="time-posted">{elapsedTime(timeCreated)}</span>
			<span className="awards">
				{data.all_awardings.map(
					({ name, description, icon_url, count }) => {
						return (
							<Award
								{...{ name, description, icon_url, count }}
							/>
						);
					}
				)}
			</span>
		</p>
	);

	const shouldCollapse =
		data.collapsed_because_crowd_control === null ? true : false;

	return (
		// using key as [commentObj]data.id idk how the id is used in reddit tho.
		<div
			className={className}
			style={commentMarginLeft}
			tabIndex={topLevel ? 1 : -1}
		>
			{/*todo: try combo of height: 0.4, transition, shadow to achieve this too */}
			<Collapsible
				trigger={d}
				transitionTime={100}
				open={shouldCollapse} // user Preference NAH ? but do use data.collapsed_because_crowd_control
				lazyRender={true}
			>
				<div ref={com}>
					<p
						className="comment-text"
						style={marginLeft}
						dangerouslySetInnerHTML={convertHTMLEntity(
							data.body_html
						)}
					></p>
					{data.replies !== "" &&
						data.replies.data.children.map((replyData) => {
							// replyData is a standard comment Obj
							if (replyData.kind === "more") {
								return (
									<LoadMoreComments
										{...{
											getComments,
											perma_link,
											setCurrentComments,
											data: replyData.data
										}}
									/>
								);
							}
							// todo: return a <load more/> component;
							return (
								<Comment
									data={replyData.data}
									ml={ml + mlinc}
									key={replyData.data.id}
									getComments={getComments}
									level={level + 1}
									{...{
										id: replyData.id,
										perma_link,
										setCurrentComments
									}}
								/>
							);
							// {data.replies && <Comment data={data.replies.data.children}></Comment>}
						})}
				</div>
			</Collapsible>
		</div>
	);
};

export default Comment;

// profile pics
// https://www.reddit.com/user/<USERNAME>/about.json
// data/icon_img
