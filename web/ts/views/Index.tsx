import ConnectionPanel from "components/panel/Connection";
import { Col, Container, Row } from "photoncss/lib/react";
import React from "react";
import useUser from "../runtime/util/hooks/useUser";

export const route = "/";

export default function View(): JSX.Element | null {

	const [ user ] = useUser();

	if (!user) return null;

	return (
		<Container>
			<Row>

				<Col sm={12} lg={4} xl={3}>
					<ConnectionPanel/>
				</Col>

			</Row>
		</Container>
	);
}
