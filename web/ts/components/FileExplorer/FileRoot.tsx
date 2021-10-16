import { List } from "photoncss/lib/react";
import React from "react";
import FileEntry from "components/FileExplorer/FileEntry";

export type Props = { files: Octo.File[], free: number };

export default function FileRoot({ files }: Props): JSX.Element {
	return (
		<List style={{ marginLeft: 0, marginRight: 0, borderLeft: "none", borderRight: "none" }}>
			{ files.map(file => {
				return <FileEntry {...file} />;
			})}
		</List>
	);
}
