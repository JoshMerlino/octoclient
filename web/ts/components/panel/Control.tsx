import { Col } from "photoncss/lib/react";
import React from "react";
import ConnectionPanel from "./Connection";
import JobPanel from "./JobPanel";
import TemperaturePanel from "./TemperaturePanel";

export default function ControlPanel(): JSX.Element {

	// Return control panel
	return (
		<>
			<Col sm={12} lg={4}>
				<ConnectionPanel/>
				<JobPanel/>
			</Col>
			<Col sm={12} lg={8}>
				<TemperaturePanel/>
			</Col>
		</>
	);
}
