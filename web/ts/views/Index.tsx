import React from "react";
import useUser from "../runtime/util/useUser";

export const route = "/";

export default function View(): JSX.Element | null {

	const [ user ] = useUser();

	if (!user) return null;

	return (
		<>
			<p>Hello { user.name }</p>
		</>
	);
}
