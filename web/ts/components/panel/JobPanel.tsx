import { Button, Card, CardActions, CardTitle, Spinner, TextIcon } from "photoncss/lib/react";
import React, { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import useAPI from "runtime/util/hooks/useAPI";
import humanizeDuration from "humanize-duration";
import Code from "components/Code";
import api from "runtime/util/api";

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

	// Calculate length of filament
	const filamentUsage = Math.ceil(Object.values(state.job.filament ?? { "0": 0 })
		.map(({ length }) => length)
		.reduce((a, b) => a + b, 0));

	// Printer functions
	async function command(command: string, action?: string) {
		await api("/api/job", {
			method: "POST",
			body: JSON.stringify({ command, action })
		});
	}

	return (
		<Card variant="outlined">
			<CardTitle subtitle={state.state}>Job</CardTitle>
			<div className="prog-container">
				<div className="prog-wrapper prog-yellow">
					<CircularProgressbar value={state.progress.completion >= 100 ? 0 : state.progress.completion} text={state.progress.completion >= 100 ? "Done":`${Math.min(state.progress.completion, 100).toFixed(0)}%`}/>
				</div>
				<div className="prog-offset">
					<h2>{ state.job.file.display }</h2>
					<div>
						<span>
							<b style={{ width: "100%" }}>Elapsed time</b>
							{ <p>{ humanizeDuration(Math.ceil((state.job.averagePrintTime ?? state.job.estimatedPrintTime) * 1000 * (state.progress.completion / 100)), { largest: 2, maxDecimalPoints: 0 }) }</p> }
						</span>
						<span>
							<b style={{ width: "100%" }}>Time left</b>
							{ <p>{ humanizeDuration(Math.ceil((state.job.averagePrintTime ?? state.job.estimatedPrintTime) * 1000 * (1 - state.progress.completion / 100)), { largest: 2, maxDecimalPoints: 0 }) }</p> }
						</span>
						<span>
							<b style={{ width: "100%" }}>Material used</b>
							<p>
								{ (filamentUsage * (state.progress.completion / 100) / 1000).toFixed(1) }m / {(filamentUsage / 1000).toFixed(1) }m
								<br />
								{ (filamentUsage * (state.progress.completion / 100) * .0025).toFixed(1) }g / { (filamentUsage * .0025).toFixed(1) }g
							</p>
						</span>
					</div>
				</div>
			</div>
			<CardActions direction="right">

				{ state.state === "Operational" && <Button variant="raised" color="primary" onClick={ () => command("start") }>{ state.progress.completion >= 100 ? "Print again":"Print now"}</Button> }
				{ state.state === "Paused" && <Button variant="raised" onClick={ () => command("cancel") }>Abort</Button> }
				{ state.state === "Paused" && <Button variant="raised" onClick={ () => command("pause", "resume") }>Resume</Button> }
				{ state.state === "Pausing" && <Button disabled onClick={ () => command("cancel") }>Abort</Button> }
				{ state.state === "Pausing" && <Button disabled onClick={ () => command("pause", "pause") }>Pausing</Button> }
				{ state.state === "Printing" && <Button variant="raised" onClick={ () => command("cancel") }>Abort</Button> }
				{ state.state === "Printing" && <Button variant="raised" onClick={ () => command("pause", "pause") }>Pause</Button> }

			</CardActions>
		</Card>
	);

}
