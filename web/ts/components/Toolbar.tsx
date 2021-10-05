import { Toolbar, ToolbarTitle } from "photoncss/lib/react";
import React from "react";

export default function Component(): JSX.Element {
	return (
		<>
			<Toolbar>
				<ToolbarTitle>{ APP_MANIFEST.name }</ToolbarTitle>
			</Toolbar>
		</>
	);
}
