import { Icon, ListItem, Menu } from "photoncss/lib/react";
import React from "react";
import api from "runtime/util/api";

export default function Component(): JSX.Element {

	async function apply(tool: string, target: number): Promise<Record<string, unknown>> {
		return await api(`/api/printer/${tool.replace(/[0-9]/g, "")}`, {
			method: "POST",
			body: JSON.stringify({
				command: "target",
				targets: { [tool]: target },
				target
			})
		}).then(resp => resp.json());
	}

	async function set(temp = false): Promise<Record<string, unknown>> {
		const id: string = $("#menu-temp-dropdown").data("id");
		if (!temp) $(`#input-${id}`).val("");
		const val = $(`#input-${id}`).val() || 0;
		const tool = id.replace(/temp-/g, "");
		return await apply(tool, parseInt(val.toString()));
	}

	return (
		<Menu id="menu-temp-dropdown" className="ancher-tr">
			<ListItem icon={<Icon>check</Icon>} onClick={() => set(true)}>Apply</ListItem>
			<ListItem icon={<Icon>ac_unit</Icon>} onClick={() => set()}>Cool Down</ListItem>
		</Menu>
	);
}
