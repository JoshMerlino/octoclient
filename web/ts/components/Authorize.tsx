import { Button, InputField, Snackbar, Switch, VHCenter } from "photoncss/lib/react";
import React, { useState } from "react";
import api from "../runtime/util/api";
import app from "../src/app";
import Photon from "photoncss";
import useUser from "../runtime/util/hooks/useUser";

export type ComponentProps = {
	setter: React.Dispatch<React.SetStateAction<boolean | null>>
};

export default function Authorize({ setter }: ComponentProps): JSX.Element {

	// Initialize user
	const [ , setUser ] = useUser();

	// Initialize states
	const [ isLoading, setIsLoading ] = useState(false);

	// Authorize the user
	async function authorize() {

		// Grey out the button to prevent duplicate requests
		setIsLoading(true);

		// Get information from fields
		const user = $("#username").val();
		const pass = $("#password").val();
		const remember = $("#rememberme").prop("checked");

		// Attempt to authorize
		await api("/api/login", {
			method: "POST",
			body: JSON.stringify({ user, pass, remember })
		})
			.then(response => response.json())
			.then(response => {
				if (response.hasOwnProperty("error")) {
					return Photon.Snackbar(<Snackbar>
						<p>{response.error}</p>
					</Snackbar>,
					{ duration: 10000 }).show();
				}
				localStorage.setItem("api-key", response.apikey);
				setUser(response);
				setIsLoading(false);
				setter(true);
			});
	}

	return (
		<VHCenter>
			<div className="authorize-panel">
				<img
					src={ app.static("icon.png") }
					alt=""
					style={{
						margin: "0 auto",
						display: "block",
						width: 64
					}}/>
				<h2 style={{ textAlign: "center" }}>Sign in</h2>
				<p style={{ textAlign: "center" }}>Using your { APP_MANIFEST.name } Account</p>
				<InputField
					id="username"
					type="text"
					color={isLoading ? "none" : "primary"}
					disabled={isLoading}>Username</InputField>
				<InputField
					id="password"
					type="password"
					color={isLoading ? "none" : "primary"}
					disabled={isLoading}>Password</InputField>
				<Switch
					id="rememberme"
					defaultChecked={true}
					color={isLoading ? "none" : "primary"}
					disabled={isLoading}>Remember Me</Switch>
				<Button
					id="login"
					variant="raised"
					style={{
						float: "right",
						marginTop: 0
					}}
					color={isLoading ? "none" : "primary"}
					disabled={isLoading}
					onClick={() => authorize()}>Log In</Button>
			</div>
		</VHCenter>
	);
}
