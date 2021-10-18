import ControlPanel from "components/panel/Control";
import { Container, Row, Spinner, VHCenter } from "photoncss/lib/react";
import React from "react";
import useAPI from "runtime/util/hooks/useAPI";

export const route = "/";

export default function View(): JSX.Element | null {

	// Ensure user is logged in
	const [ user ] = useAPI<Octo.User>("/api/currentuser");
	if (!user) return (
		<VHCenter>
			<Spinner/>
		</VHCenter>
	);

	// Return view
	return (
		<Container>
			<Row>
				<ControlPanel/>
			</Row>
		</Container>
	);
}
