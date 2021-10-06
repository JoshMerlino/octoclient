import React, { useEffect, useState } from "react";
import api from "../api";

export default function useAPI<T>(endpoint: string, args?: RequestInit): [ T | null | false, () => void, React.Dispatch<React.SetStateAction<T | null | false>> ] {

	// Initialize state
	const [ state, setState ] = useState<T | null | false>(null);

	// Function to refresh the current state
	function refresh() {
		api(endpoint, args)
			.then(response => response.json())
			.then(response => {
				if ("error" in response) return setState(false);
				if (response.name === null) return setState(false);
				setState(<T>response);
			});
	}

	// Refresh the state on mount so that it exists
	useEffect(refresh, []);

	// Return state and controls
	return [ state, refresh, setState ];

}
