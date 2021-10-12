import { Card, CardTitle } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";

import { CircularProgressbar } from "react-circular-progressbar";

export default function Component(): JSX.Element | null {

	// Fetch tool state from the server
	const [ tools, refreshTool ] = useAPI<Record<string, OctoTemp>>("/api/printer/tool");
	const [ bedState, refreshBed ] = useAPI<{ bed: OctoTemp }>("/api/printer/bed");
	const [ chamberState, refreshChamber ] = useAPI<{ chamber: OctoTemp }>("/api/printer/chamber");

	// Refresh state every few seconds
	useEffect(function() {
		const interval = setInterval(() => {
			refreshBed();
			refreshTool();
			refreshChamber();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Return tools
	return (
		<Card variant="outlined">
			<CardTitle style={{ marginBottom: 8 }}>Temperature</CardTitle>

			{/* Bed Temperature */}
			{ bedState !== false && bedState !== null && <span>
				<h2 style={{ marginBottom: 8 }}>Print Bed</h2>
				<div style={{ width: 36, height: 36, margin: "8px 16px", display: "inline-block", verticalAlign: "bottom" }} className="prog-green">
					<CircularProgressbar value={bedState.bed.actual/(bedState.bed.target || 0) * 100}/>
				</div>
				<div style={{ display: "inline-block" }}>
					Current Temperature: <code>{bedState.bed.actual.toFixed(1)} °C</code>
					<br />
					Target Temperature: <code>{bedState.bed.target === null ? "Off" : `${bedState.bed.target?.toFixed(1)} °C`}</code>
				</div>
				<hr style={{ margin: "8px 0" }}/>
			</span> }

			{/* Chamber Temperature */}
			{ chamberState !== false && chamberState !== null && <span>
				<h2 style={{ marginBottom: 8 }}>Print Chamber</h2>
				<div style={{ width: 36, height: 36, margin: "8px 16px", display: "inline-block", verticalAlign: "bottom" }} className="prog-red">
					<CircularProgressbar value={chamberState.chamber.actual/(chamberState.chamber.target || 0) * 100}/>
				</div>
				<div style={{ display: "inline-block" }}>
					Current Temperature: <code>{chamberState.chamber.actual.toFixed(1)} °C</code>
					<br />
					Target Temperature: <code>{chamberState.chamber.target === null ? "Off" : `${chamberState.chamber.target?.toFixed(1)} °C`}</code>
				</div>
				<hr style={{ margin: "8px 0" }}/>
			</span> }

			{/* Extruder Temperatures */}
			{ tools !== false && tools !== null && Object.keys(tools).length > 0 && Object.values(tools).map((tool, key) => <span key={key}>
				<h2 style={{ marginBottom: 8 }}>Extruder {key + 1}</h2>
				<div style={{ width: 36, height: 36, margin: "8px 16px", display: "inline-block", verticalAlign: "bottom" }} className="prog-blue">
					<CircularProgressbar value={tool.actual/(tool.target || 0) * 100}/>
				</div>
				<div style={{ display: "inline-block" }}>
					Current Temperature: <code>{tool.actual.toFixed(1)} °C</code>
					<br />
					Target Temperature: <code>{tool.target === null ? "Off" : `${tool.target?.toFixed(1)} °C`}</code>
				</div>
				{ key !== Object.keys(tools).length - 1 && <hr style={{ margin: "8px 0" }}/>}
			</span>) }

		</Card>
	);
}
