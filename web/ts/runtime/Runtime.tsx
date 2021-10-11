import Authorize from "components/Authorize";
import Footer from "components/Footer";
import Toolbar from "components/Toolbar";
import { Spinner, VHCenter } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import app from "src/app";
import Router from "./Router";
import api from "./util/api";

type Props = { views: View[] };
export default function Runtime({ views }: Props): JSX.Element | null {

	// Initialize state
	const [ state, setState ] = useState<null | boolean>(null);

	// On mount
	useEffect(function() {

		// Initialize route
		let route = "";
		(function loop(): void {

			// Run again on next fraome
			requestAnimationFrame(loop);

			// If route/page was changed
			if (route !== app.getRoute()) {

				// Change route cache
				route = app.getRoute();

				// Reset scroll
				$(window).scrollTop(0);

				// Get view
				const _views = views.filter(({ route }) => new RegExp(route.replace(/:\w.*/g, "\\w.*"), "g").test(app.getRoute()));
				const view = _views.length > 1 ? _views[_views[0].route === "/" ? 1:0] : _views[0];

				// Get title from route
				const title = view?.title !== undefined ? `${view.title} • ${APP_MANIFEST.name}` : APP_MANIFEST.name;

				// Set new title
				document.title = title;

			}
		}());
	}, []);

	// Fetch current user
	useEffect(function() {

		// Attempt to get current user
		api("/api/login", {
			method: "POST",
			body: JSON.stringify({ passive: true })
		})
			.then(response => response.json())
			.then(response => {

				// If not logged in
				if ("error" in response) return setState(false);
				api("/api/currentuser")
					.then(response => response.json())
					.then(response => {
						if ("error" in response) return setState(false);
						if (response.name === null) return setState(false);
						// eslint-disable-next-line no-extra-parens
						(window as any).user = response;
						setState(true);
					});

			});

	}, []);

	// Render router
	return (
		<Router>
			<main>
				<Switch>
					{ state === false ? <>
						<Authorize setter={setState}/>
					</> : <>
						<Toolbar setter={setState}/>
						<br />
						{ state === null ? <>
							<VHCenter>
								<Spinner/>
							</VHCenter>
						</> : views.map(({ route, default: view }, key) =>
							<Route
								key={key}
								path={route}
								exact={true}
								component={view as unknown as React.ComponentType}/>
						) }
					</> }
				</Switch>
			</main>
			<Footer/>
		</Router>
	);

}
