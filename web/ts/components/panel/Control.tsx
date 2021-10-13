import { Col, Spinner, VHCenter } from "photoncss/lib/react";
import React, { useEffect } from "react";
import useAPI from "runtime/util/hooks/useAPI";
import ConnectionPanel from "./Connection";

export default function ControlPanel(): JSX.Element {

	// Get state from server and sync it with the component
	const [ state, refresh ] = useAPI<Octo.FullState>("/api/printer");

	// Refresh state every second
	useEffect(function refresher() {
		refresh();
		const interval = setTimeout(refresher, 1000);
		return () => clearTimeout(interval);
	}, []);

	// If state is still loading show a spinner
	if (!state) return (
		<VHCenter>
			<Spinner/>
		</VHCenter>
	);

	// Return control panel
	return (
		<>
			<Col sm={12} lg={4}>
				<ConnectionPanel/>
			</Col>
		</>
	);
}
