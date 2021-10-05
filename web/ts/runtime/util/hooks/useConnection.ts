import React, { useEffect, useState } from "react";
import api from "../api";

export default function useConnection(): [ OctoConnection | null | false, React.Dispatch<React.SetStateAction<OctoConnection | null | false>> ] {
	const [ state, setState ] = useState<OctoConnection | null | false>(null);

	useEffect(function() {
		api("/api/connection")
			.then(response => response.json())
			.then(response => {
				if ("error" in response) return setState(false);
				if (response.name === null) return setState(false);
				setState(<OctoConnection>response);
			});
	}, []);

	return [ state, setState ];
}
