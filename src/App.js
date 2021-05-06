import React, { useRef, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";

import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar.js";
import Thoughts from "./components/Thoughts.js";

function App() {
	// app should show sub selection page or home page on /
	let m = useRouteMatch("/:postUrl");
	// {match:{params:{subName}}}
	console.log(m?.params?.postUrl);
	const [subreddit, setSubreddit] = useState("showerthoughts");
	const previousSubreddit = useRef();

	return (
		<div className="App">
			<Header
				subreddit={subreddit}
				setSubreddit={setSubreddit}
				previousSubreddit={previousSubreddit}
			/>
			<div className="container">
				<Sidebar />
				<Thoughts {...{ subreddit, setSubreddit, previousSubreddit }} />
			</div>
		</div>
	);
}

export default App;
