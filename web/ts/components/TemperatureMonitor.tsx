import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import TemperatureControls from "./TemperatureControls";

export type Temperature = {
    name: string;
    actual: number;
    target: number;
    offset: number;
};

export default function TemperatureMonitor({ name: realName, actual, target, state }: { state: Octo.State } & Temperature): JSX.Element {

	// Rename tool
	const name = realName.replace(/tool0/gm, "tool");

	// Return temperature value
	return (
		<div className="temperature">
			<div className={`prog-wrapper prog-${name.includes("tool") ? "red":name.includes("chamber") ? "purple":"blue"}`}>
				<CircularProgressbar value={target === 0 ? 0 : actual / target * 100} text={target === 0 ? "Off" : `${(Math.min(actual / target, 1) * 100).toFixed(0)}%`}/>
			</div>
			<div className="prog-offset">
				<h2>{ name }</h2>
				<div>
					<span>
						<b style={{ width: "100%" }}>Target temperature</b>
						{ target === 0 ? <p>Off</p> : <p>{ target.toFixed(1) } °C</p> }
					</span>
					<span>
						<b style={{ width: "100%" }}>Temperature</b>
						<p>{ actual.toFixed(1) } °C</p>
					</span>
					<span style={{
						flexGrow: 1,
						display: "block",
						marginTop: "-62px",
						padding: "1rem",
						transform: "translateY(8px)"
					}}>
						<TemperatureControls flags={state.flags} tool={realName} target={target}/>
					</span>
				</div>
			</div>
		</div>
	);
}
