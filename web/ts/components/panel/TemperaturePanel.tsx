import React from "react";
import useAPI from "runtime/util/hooks/useAPI";

export default function Component(): JSX.Element | null {

	// Fetch tool state from the server
	const [ tools ] = useAPI<Record<string, OctoTool>>("/api/printer/tool");

	// If no tools have loaded yet, return nothing
	if (tools === null) return null;

	// Return tools
	return <>{ }</>;
}
