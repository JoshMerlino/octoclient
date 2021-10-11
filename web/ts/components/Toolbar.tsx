import { Toolbar, ToolbarActions, ToolbarTitle } from "photoncss/lib/react";
import React from "react";
import Logout from "./Logout";
import ThemeSwitcher from "./ThemeSwitcher";

export type ComponentProps = { setter: React.Dispatch<React.SetStateAction<boolean | null>>};
export default function Component({ setter }: ComponentProps): JSX.Element {
	return (
		<>
			<Toolbar>
				<ToolbarTitle>{ APP_MANIFEST.name }</ToolbarTitle>
				<ToolbarActions>
					<ThemeSwitcher/>
					<Logout setter={setter}/>
				</ToolbarActions>
			</Toolbar>
		</>
	);
}
