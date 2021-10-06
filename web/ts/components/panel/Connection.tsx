import { Button, Card, CardActions, CardTitle, InputField, Spinner } from "photoncss/lib/react";
import React, { useState } from "react";
import useConnection from "../../runtime/util/hooks/useConnection";
import api from "../../runtime/util/api";

export default function ConnectionPanel(): JSX.Element {

	const [ connection,, refreshConnection ] = useConnection();
	const [ isChanged, setChanged ] = useState(false);
	const [ isConnected, setConnected ] = useState<null | boolean>(null);

	if (!connection) return (
		<Card variant="outlined">
			<CardTitle subtitle="Loading...">Connection</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	if (connection?.current?.state === "Detecting serial connection") setTimeout(refreshConnection, 1000);
	if (isConnected === null) setConnected(connection?.current?.state === "Operational");

	const buttonEnabled = (isConnected || isChanged) && !(connection?.current?.state === "Detecting serial connection");

	async function connect() {
		if (!isConnected) {
			const port = $("#serial-port").val();
			const baudratePreference = $("#baud-rate").val();

			await api("/api/connection", {
				method: "POST",
				body: JSON.stringify({
					port,
					baudratePreference,
					autoconnect: true,
					save: true,
					command: "connect"
				})
			});

			setChanged(false);
			setConnected(true);
		} else {

			await api("/api/connection", {
				method: "POST",
				body: JSON.stringify({
					command: "disconnect"
				})
			});

			setConnected(false);
			setChanged(true);
		}
		refreshConnection();
	}

	return (
		<Card variant="outlined">
			<CardTitle subtitle={connection.current.state}>Connection</CardTitle>

			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="serial-port"
					onChange={ () => setChanged(true) }
					defaultValue={connection.current.port}
					dropdown={connection.options.ports}>Serial Port</InputField>
			</div>
			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="baud-rate"
					onChange={ () => setChanged(true) }
					defaultValue={connection.current.baudrate}
					dropdown={connection.options.baudrates.map(a => a.toString()).reverse()}>Baud Rate</InputField>
			</div>

			<CardActions direction="right">
				<Button
					variant="raised"
					disabled={!buttonEnabled}
					onClick={ () => connect() }
					color={buttonEnabled ? "primary":"none"}>{ isConnected ? "Disconnect" : "Connect" }</Button>
			</CardActions>

		</Card>
	);
}
