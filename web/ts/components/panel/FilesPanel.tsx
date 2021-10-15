import FileRoot from "components/FileExplorer/FileRoot";
import { Card, CardTitle, Spinner, TextIcon } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";
import prettyBytes from "pretty-bytes";

export default function FilesPanel(): JSX.Element {

	// Initialize state
	const [ state, refresh ] = useAPI<Octo.Files>("/api/files?recursive=true");

	// Refresh state every second
	useEffect(function refresher() {
		refresh();
		const interval = setTimeout(refresher, APP_CONFIG["refresh-rate"]);
		return () => clearTimeout(interval);
	}, []);

	// Show loading spinner if it hasn't resolved yet.
	if (state === null) return (
		<Card variant="outlined">
			<CardTitle>File Explorer</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	// Show loading spinner if it hasn't resolved yet.
	if (state === false) return (
		<Card variant="outlined">
			<CardTitle>File Explorer</CardTitle>
			<p style={{ position: "relative", paddingTop: 4 }}>
				<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons">error_outline</TextIcon>
				<span style={{ paddingLeft: 32, display: "block" }}>...</span>
			</p>
		</Card>
	);

	// Return panel
	return (
		<Card variant="outlined" style={{ paddingBottom: 16 }}>
			<CardTitle seperated={false} subtitle={`${prettyBytes(state.free)} Remaining`}>File Explorer</CardTitle>
			<FileRoot {...state}/>
			<pre>{ JSON.stringify(state, null, 4) }</pre>
		</Card>
	);
}
