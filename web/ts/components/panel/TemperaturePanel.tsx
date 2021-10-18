import Code from "components/Code";
import TemperatureMonitor from "components/TemperatureMonitor";
import { Card, CardTitle, Spinner, TextIcon } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";

export default function Component(): JSX.Element {

	// Initialize state
	const [ state, refresh ] = useAPI<Octo.FullState>("/api/printer");

	// Refresh state every second
	useEffect(function refresher() {
		refresh();
		const interval = setTimeout(refresher, APP_CONFIG["refresh-rate"]);
		return () => clearTimeout(interval);
	}, []);

	// Show loading spinner if it hasn't resolved yet.
	if (state === null || state && Object.keys(state.temperature).length === 0) return (
		<Card variant="outlined">
			<CardTitle>Temperature</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	// Show loading spinner if it hasn't resolved yet.
	if (state === false) return (
		<Card variant="outlined">
			<CardTitle>Temperature</CardTitle>
			<p style={{ position: "relative", paddingTop: 4 }}>
				<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons">error_outline</TextIcon>
				<span style={{ paddingLeft: 32, display: "block" }}>Not connected to a printer.</span>
			</p>
		</Card>
	);

	// Get temperatures
	const temperatures = Object.keys(state.temperature)
		.map(name => ({ ...state.temperature[name], name }));

	// Return panel
	return (
		<Card variant="outlined" style={{ paddingBottom: 16 }}>
			<CardTitle>Temperature</CardTitle>
			{ temperatures.map((temp, key) => <div key={key}>
				<TemperatureMonitor {...temp} state={state.state}/>
				{ key !== temperatures.length -1 && <hr/> }
			</div>) }
		</Card>
	);
}
