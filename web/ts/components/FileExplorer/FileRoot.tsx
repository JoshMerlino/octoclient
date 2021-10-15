import { List } from "photoncss/lib/react";
import React from "react";
import FileEntry from "components/FileExplorer/FileEntry";

export type Props = { files: Octo.File[] };

export default function FileRoot({ files }: Props): JSX.Element {
	return (
		<List style={{ marginLeft: -1, marginRight: -1 }}>
			{ files.map(file => {
				return <FileEntry file={file} />;
			})}
		</List>
	);
}
