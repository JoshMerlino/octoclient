import { Button, Card, CardActions, CardTitle, TextIcon, InputField, Snackbar, Spinner } from "photoncss/lib/react";
import React, { useState } from "react";
import Photon from "photoncss";
import useAPI from "runtime/util/hooks/useAPI";
import api from "runtime/util/api";

export default function ConnectionPanel(): JSX.Element {

	// Initialize states.
	const [ connection, refreshConnection ] = useAPI<Octo.Connection>("/api/connection");
	const [ isChanged, setChanged ] = useState(false);
	const [ isConnected, setConnected ] = useState<null | boolean>(null);

	// Show loading spinner if it hasn't resolved yet.
	if (!connection) return (
		<Card variant="outlined">
			<CardTitle subtitle="Loading...">Connection</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	// Initialize connection.
	if (connection?.current?.state === "Detecting serial connection") setTimeout(refreshConnection, APP_CONFIG["refresh-rate"]);
	if (isConnected === null) setConnected(connection?.current?.state === "Operational");

	// Should button be enabled based on the state.
	const buttonEnabled = (isConnected || isChanged) && !(connection?.current?.state === "Detecting serial connection") && !(connection?.current?.state === "Printing");

	// Function to manage the connection.
	async function connect() {

		// If the printer is printing, dont fuck with the connection.
		if (connection && connection?.current?.state === "Printing") return Photon.Snackbar(<Snackbar>
			<p>Printer is currently printing. You must end the current print before the connection is closed.</p>
		</Snackbar>, { duration: 10000 });

		// If its not connected, then connect
		if (!isConnected) {

			// Get information from dropdowns
			const port = $("#serial-port").val();
			const baudratePreference = $("#baud-rate").val();

			// POST to the server
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

			// Update state
			setChanged(false);
			setConnected(true);

		// eslint-disable-next-line brace-style
		}

		// If its already connected, then disconnect it
		else {

			// Disconnect the printer
			await api("/api/connection", {
				method: "POST",
				body: JSON.stringify({
					command: "disconnect"
				})
			});

			// Update state
			setConnected(false);
			setChanged(true);

		}

		// Refresh the connection status with the latest information from the server.
		refreshConnection();

	}

	// Get if is printing
	const isPrinting = connection.current.state === "Printing";

	// Return UI
	return (
		<Card variant="outlined">
			<CardTitle subtitle={connection.current.state}>Connection</CardTitle>

			{ isPrinting && <>
				<p style={{ position: "relative" }}>
					<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons">error_outline</TextIcon>
					<span style={{ paddingLeft: 32, display: "block" }}>Connection can not be modified during a print.</span>
				</p>
				<hr style={{ marginTop: 12 }} />
			</> }

			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="serial-port"
					disabled={isPrinting}
					onChange={ () => setChanged(true) }
					defaultValue={connection.current.port}
					dropdown={connection.options.ports}>Serial Port</InputField>
			</div>
			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="baud-rate"
					disabled={isPrinting}
					onChange={ () => setChanged(true) }
					defaultValue={connection.current.baudrate}
					dropdown={connection.options.baudrates.map(a => a.toString()).reverse()}>Baud Rate</InputField>
			</div>

			<CardActions direction="right">
				<Button
					variant={buttonEnabled ? "raised":"contained"}
					disabled={!buttonEnabled}
					onClick={ () => connect() }
					color={buttonEnabled ? "primary":"none"}>{ isConnected || isPrinting ? "Disconnect" : "Connect" }</Button>
			</CardActions>

		</Card>
	);
}
