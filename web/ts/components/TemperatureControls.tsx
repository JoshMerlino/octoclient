import Photon from "photoncss";
import { Icon, InputField } from "photoncss/lib/react";
import React from "react";

export type Props = { tool: string, target?: number };
export default function TemperatureControls({ tool, target }: Props): JSX.Element {

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
