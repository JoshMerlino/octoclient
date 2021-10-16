import { Col } from "photoncss/lib/react";
import React from "react";
import ConnectionPanel from "./Connection";
import FilesPanel from "./FilesPanel";
import JobPanel from "./JobPanel";
import TemperaturePanel from "./TemperaturePanel";

export default function ControlPanel(): JSX.Element {

	// Return control panel
	return (
		<>
			<Col sm={12} lg={4}>
				<ConnectionPanel/>
				<FilesPanel/>
			</Col>
			<Col sm={12} lg={8}>
				<TemperaturePanel/>
				<JobPanel/>
			</Col>
		</>
	);
}
