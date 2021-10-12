import { Card, CardTitle } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";

import { CircularProgressbar } from "react-circular-progressbar";

export default function Component(): JSX.Element | null {

	// Fetch tool state from the server
	const [ tools, refreshTool ] = useAPI<Record<string, OctoTool>>("/api/printer/tool");
	const [ bedState, refreshBed ] = useAPI<{ bed: OctoTool }>("/api/printer/bed");

	// Refresh state every few seconds
	useEffect(function() {
		const interval = setInterval(() => {
			refreshBed();
			refreshTool();
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// If no tools have loaded yet, return nothing
	if (tools === null || bedState === null || bedState === false) return null;

	const { bed } = bedState;

	// Return tools
	return (
		<Card variant="outlined">
			<CardTitle style={{ marginBottom: 8 }}>Temperature</CardTitle>

			<div style={{ width: 36, height: 36, margin: "8px 16px", display: "inline-block" }} className="prog-wrapper prog-green">
				<CircularProgressbar value={bed.actual/(bed.target || 0) * 100}/>
			</div>
			<div style={{ display: "inline-block" }}>

				Current Temperature: <code>{bed.actual.toFixed(1)} °C</code>

			</div>

			<hr style={{ margin: "8px 0" }}/>

			{ Object.values(tools).map((tool, index) => <>
				<div style={{ width: 72, height: 72, margin: "8px 16px", display: "inline-block" }} className="prog-blue">
					<CircularProgressbar value={tool.actual/tool.target * 100} text={`${tool.actual.toFixed(1)} °C`} />
				</div>
				tool: {JSON.stringify(tool)}
				{ index !== Object.keys(tools).length - 1 && <hr style={{ margin: "12px 0" }}/>}
			</>) }

		</Card>
	);
}
