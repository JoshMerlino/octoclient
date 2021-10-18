import { List } from "photoncss/lib/react";
import React from "react";
import FileEntry from "components/FileExplorer/FileEntry";

export type Props = { files: Octo.File[], free: number };

export default function FileRoot({ files }: Props): JSX.Element {
	return (
		<List style={{ margin: "-13px 0px -17px", border: "none", maxHeight: 400, overflow: "auto"}}>
			{ files.map((file, key) => {
				return <FileEntry key={key} {...file} />;
			})}
		</List>
	);
}
