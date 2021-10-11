import ConnectionPanel from "components/panel/Connection";
import TemperaturePanel from "components/panel/TemperaturePanel";
import { Col, Container, Row } from "photoncss/lib/react";
import React from "react";
import useAPI from "runtime/util/hooks/useAPI";

export const route = "/";

export default function View(): JSX.Element | null {

	// Ensure user is logged in
	const [ user ] = useAPI<OctoUser>("/api/currentuser");
	if (!user) return null;

	// Return view
	return (
		<Container>
			<Row>

				<Col sm={12} lg={4} xl={3}>
					<ConnectionPanel/>
				</Col>
				<Col sm={12} lg={8} xl={9}>
					<TemperaturePanel/>
				</Col>

			</Row>
		</Container>
	);
}
