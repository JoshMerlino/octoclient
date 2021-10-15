import { ListItem, TextIcon } from "photoncss/lib/react";
import React from "react";

export type Props = { file: Octo.File };
export default function File({ file }: Props): JSX.Element {
	return (
		<ListItem
			icon={<TextIcon variant="outlined">insert_drive_file</TextIcon>}>
			{file.display}
		</ListItem>
	);
}
