import { Card, CardTitle, InputField, Spinner } from "photoncss/lib/react";
import React from "react";
import useConnection from "../../runtime/util/hooks/useConnection";

export default function ConnectionPanel(): JSX.Element {

	const [ connection ] = useConnection();

	if (!connection) return (
		<Card variant="outlined">
			<CardTitle>Connection</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	return (
		<Card variant="outlined">
			<CardTitle>Connection</CardTitle>

			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					defaultValue={connection.current.port}
					dropdown={connection.options.ports}>Serial Port</InputField>
			</div>
			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					defaultValue={connection.current.baudrate}
					dropdown={connection.options.baudrates.map(a => a.toString()).reverse()}>Baud Rate</InputField>
			</div>

		</Card>
	);
}
