import { Button, Card, CardActions, CardTitle, TextIcon, InputField, Snackbar, Spinner } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import Photon from "photoncss";
import useAPI from "runtime/util/hooks/useAPI";
import api from "runtime/util/api";
import Code from "components/Code";

export default function ConnectionPanel(): JSX.Element {

	// Initialize states.
	const [ state, refresh ] = useAPI<Octo.Connection>("/api/connection");
	const [ isChanged, setChanged ] = useState(false);
	const [ isConnected, setConnected ] = useState<null | boolean>(null);

	// Refresh state every second
	useEffect(function refresher() {
		refresh();
		const interval = setTimeout(refresher, APP_CONFIG["refresh-rate"]);
		return () => clearTimeout(interval);
	}, []);

	// Show loading spinner if it hasn't resolved yet.
	if (!state) return (
		<Card variant="outlined">
			<CardTitle subtitle="Loading...">Connection</CardTitle>
			<div style={{ textAlign: "center" }}>
				<Spinner/>
			</div>
		</Card>
	);

	// Initialize connection.
	if (isConnected === null) setConnected(state?.current?.state === "Operational");

	// Should button be enabled based on the state.
	const buttonEnabled = (isConnected || isChanged) && !(state?.current?.state === "Detecting serial connection") && !(state?.current?.state === "Printing");

	// Function to manage the connection.
	async function connect() {

		// If the printer is printing, dont fuck with the connection.
		if (state && state?.current?.state === "Printing") return Photon.Snackbar(<Snackbar>
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

	}

	// Get if is printing
	const isPrinting = state.current.state === "Printing";

	// Return UI
	return (
		<Card variant="outlined">
			<CardTitle subtitle={state.current.state}>Connection</CardTitle>

			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="serial-port"
					disabled={isPrinting || isConnected}
					onChange={ () => setChanged(true) }
					defaultValue={state.current.port}
					dropdown={state.options.ports}>Serial Port</InputField>
			</div>
			<div className="card-input-wrapper">
				<InputField
					variant="outlined"
					color="primary"
					id="baud-rate"
					disabled={isPrinting || isConnected}
					onChange={ () => setChanged(true) }
					defaultValue={state.current.baudrate}
					dropdown={state.options.baudrates.map(a => a.toString()).reverse()}>Baud Rate</InputField>
			</div>

			{ isPrinting && <>
				<hr style={{ margin: "12px 0" }} />
				<p style={{ position: "relative" }}>
					<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons">error_outline</TextIcon>
					<span style={{ paddingLeft: 32, display: "block" }}>Connection can not be modified during a print.</span>
				</p>
			</> }

			{ !PRODUCTION && <>
				<hr /><Code language="javascript">{JSON.stringify(state, null, 2)}</Code>
			</> }

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
