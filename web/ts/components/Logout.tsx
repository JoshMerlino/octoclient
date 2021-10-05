import { Icon } from "photoncss/lib/react";
import React from "react";
import api from "../runtime/util/api";

export type LogoutProps = { setter: React.Dispatch<React.SetStateAction<boolean | null>>};
export default function Logout({ setter }: LogoutProps): JSX.Element {
	function logout() {
		api("/api/logout", { method: "POST" });
		localStorage.setItem("api-key", "");
		setter(false);
	}
	return (
		<Icon onClick={() => logout()}>exit_to_app</Icon>
	);
}
