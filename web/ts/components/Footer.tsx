import { Footer, FooterCopyright } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";

export function MoTD(): JSX.Element | null {

	type State = { motd: string } | null;

	// Initialize state
	const [ state, setState ] = useState<State>(null);

	// Have state sync with server every second while component is mounted
	useEffect(function() {
		if (state === null) fetch("https://joshm.us.to/api/v1/motd").then(resp => resp.json())
			.then(setState);
	});

	// If loading
	if (state === null) return null;

	// Return motd
	return <p>{state!.motd}</p>;

}

export default function Component(): JSX.Element {
	return (
		<Footer className="theme--dark" style={{ paddingTop: 0 }}>
			<FooterCopyright>
				{ APP_MANIFEST.name }
			</FooterCopyright>
		</Footer>
	);
}
