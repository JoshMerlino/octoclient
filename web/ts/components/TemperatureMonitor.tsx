import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

export type Temperature = {
    name: string;
    actual: number;
    target: number;
    offset: number;
};

export default function TemperatureMonitor({ name, actual, target, offset }: Temperature): JSX.Element {

	// Rename tool
	name = name.replace(/tool/gm, "extruder ").replace(/\s0/gm, "");

	// Return temperature value
	return (
		<div className="temperature">
			<div className={`prog-wrapper prog-${name.includes("extruder") ? "red":"blue"}`}>
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
				</div>
			</div>
		</div>
	);
}
