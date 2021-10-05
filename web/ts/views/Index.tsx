import React from "react";

export const route = "/";

export default function View(): JSX.Element {
	return (
		<>
			<p>{ window.user.name }</p>
		</>
	);
}
