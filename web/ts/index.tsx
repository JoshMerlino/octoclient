// Import stylesheets
import ThemeSwitcher from "components/ThemeSwitcher";
import "photoncss/dist/photon.css";
import PWAInstaller from "pwa-installer-react";
import React from "react";
import { render } from "react-dom";
import Runtime from "runtime/Runtime";

// Import scripts
import "script-loader!jquery";
import "../../styles/main.less";
import ErrorBoundry from "runtime/ErrorBoundry";
import "runtime/util/offlineInstaller";

// Import all views
const views: View[] = [];
const importAll = (c: __WebpackModuleApi.RequireContext): void => c.keys().forEach(m => views.push(c(m)));
importAll(require.context("./views", true, /\.js$/));

// Wait for the DOM to load before rendering
document.addEventListener("DOMContentLoaded", function() {

	// Append a container to the DOM to render content into
	const root = document.createElement("DIV");
	root.id = "root";
	document.body.append(root);

	// Render root component into react-root container
	render(
		<ErrorBoundry>
			<Runtime views={views}/>
			<ThemeSwitcher providerOnly/>
			<PWAInstaller/>
		</ErrorBoundry>,
		document.getElementById("root"));

});
