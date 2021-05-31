import React, { useRef, useState } from "react";
import {
	useLocation,
	useHistory,
	useRouteMatch,
	Route,
	Switch
} from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { atom, Provider } from "jotai";

import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar.js";
import Thoughts from "./components/Thoughts.js";
import NotFound from "./NotFound.js";

import Home from "./components/Home.js";

// const renderAtom = atom(false);

function App() {
	// app should show sub selection page or home page on /
	let m = useRouteMatch("/r/:sub/:postUrl");
	// {match:{params:{subName}}}
	console.log(m?.params?.postUrl);
	const history = useHistory();
	// const [subreddit, setSubreddit] = useState("showerthoughts");
	const [subCount, setSubCount] = useState();
	// ! remove me
	// const [viewStyle, setViewStyle] = useState(false);
	const [shouldBlurAll, setShouldBlurAll] = useState(true);

	useHotkeys("ctrl + shift + b", (e) => {
		// prevent hiding, opening bookmarks bar.
		e.preventDefault();
		setShouldBlurAll((b) => !b);
	});

	useHotkeys("backspace", () => history.goBack());

	// scroll to top
	useHotkeys("g", () => {
		document.querySelector("#root").scrollIntoView();
	});

	return (
		<Provider>
			<div className="App">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/r/:subreddit">
						<Header />
						<div className="container">
							{/*<Sidebar />*/}
							<Thoughts
								{...{
									// viewStyle,
									shouldBlurAll
								}}
							/>
						</div>
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</Provider>
	);
}

export default App;
