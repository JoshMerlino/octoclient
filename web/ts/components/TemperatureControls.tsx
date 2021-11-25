import Photon from "photoncss";
import { Icon, InputField, TextIcon } from "photoncss/lib/react";
import React from "react";

export type Props = { tool: string, target?: number, flags: Octo.Flags };
export default function TemperatureControls({ flags, tool, target }: Props): JSX.Element {

	if (!(flags.ready && flags.operational)) return (
		<div className="temp-controls" style={{ transform: "translate(-48px, 36px)" }}>
			<TextIcon style={{ position: "absolute", margin: "-4px 0" }} className="error-color material-icons variant-outlined">cancel</TextIcon>
			<span style={{ paddingLeft: 32, display: "block", transform: "translateY(-2px)"}}>In use</span>
		</div>
	);

	// Generate id
	const id = `temp-${tool}`;

	return (
		<div className="temp-controls">

			<InputField
				type="number"
				min="0"
				max="999"
				placeholder="Off"
				suffix="°C"
				id={`input-${id}`}
				defaultValue={ target || "" }
				style={{
					maxWidth: 43,
					minWidth: 0
				}} />

			<Icon
				style={{
					marginTop: -64
				}}
				onClick={ (event: MouseEvent) => {

					$("#menu-temp-dropdown")
						.data("id", id)
						.data("tool", tool);

					Photon.Menu("#menu-temp-dropdown")
						.anchor($(event.target!).offset()!.left - 170, $(event.target!).offset()!.top + $("main").scrollTop()!)
						.open();

				} }>thermostat</Icon>

		</div>
	);
}
