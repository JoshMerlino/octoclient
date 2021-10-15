import { Card, CardTitle, Spinner, TextIcon } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";

export default function JobPanel(): JSX.Element {

	// Initialize state
	const [ state, refresh ] = useAPI<Octo.CurrentJob>("/api/job");

	// Refresh state every second
	useEffect(function refresher() {
		refresh();
		const interval = setTimeout(refresher, APP_CONFIG["refresh-rate"]);
		return () => clearTimeout(interval);
	}, []);

	// Show loading spinner if it hasn't resolved yet.
	if (state === null) return (
		<Card variant="outlined">
			<CardTitle>Job</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	// Show loading spinner if it hasn't resolved yet.
	if (state === false || state.job?.file?.display === null) return (
		<Card variant="outlined">
			<CardTitle>Job</CardTitle>
			<p style={{ position: "relative", paddingTop: 4 }}>
				<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons">error_outline</TextIcon>
				<span style={{ paddingLeft: 32, display: "block" }}>{ state && state.state === "Operational" ? "No jobs active." : "Not connected to a printer."}</span>
			</p>
		</Card>
	);

	// Return panel
	return (
		<Card variant="outlined" style={{ paddingBottom: 16 }}>
			<CardTitle>Job</CardTitle>
			{ JSON.stringify(state) }
		</Card>
	);
}
