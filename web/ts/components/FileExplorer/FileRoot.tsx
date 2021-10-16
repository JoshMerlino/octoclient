import { List } from "photoncss/lib/react";
import React from "react";
import FileEntry from "components/FileExplorer/FileEntry";

export type Props = { files: Octo.File[], free: number };

export default function FileRoot({ files }: Props): JSX.Element {
	return (
		<List style={{ margin: " -20px 0", border: "none", maxHeight: 400, overflow: "auto"}}>
			{ files.map(file => {
				return <FileEntry {...file} />;
			})}
		</List>
	);
}
