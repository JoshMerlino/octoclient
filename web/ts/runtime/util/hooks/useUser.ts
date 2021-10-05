import React, { useEffect, useState } from "react";
import api from "../api";

export default function useUser(): [ OctoUser | null | false, React.Dispatch<React.SetStateAction<OctoUser | null | false>> ] {
	const [ state, setState ] = useState<OctoUser | null | false>(null);

	useEffect(function() {
		api("/api/currentuser")
			.then(response => response.json())
			.then(response => {
				if ("error" in response) return setState(false);
				if (response.name === null) return setState(false);
				setState(<OctoUser>response);
			});
	}, []);

	return [ state, setState ];
}
