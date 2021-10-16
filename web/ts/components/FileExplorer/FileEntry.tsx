import dayjs from "dayjs";
import DurationPlugin from "dayjs/plugin/Duration";
import RelativeTimePlugin from "dayjs/plugin/RelativeTime";
import { ListItem, TextIcon } from "photoncss/lib/react";
import prettyBytes from "pretty-bytes";
import React from "react";
dayjs.extend(DurationPlugin);
dayjs.extend(RelativeTimePlugin);

export default function File({ display, size, gcodeAnalysis }: Octo.File): JSX.Element {
	return (
		<ListItem style={{ height: 56, position: "relative"}}>
			<TextIcon variant="outlined">description</TextIcon>
			<span style={{ marginTop: -8, marginLeft: -8, position: "absolute" }}>
				<h4 style={{ opacity: .54, margin: "0 8px", marginBottom: -4 }}>{ display }</h4>
				<span style={{ fontSize: 14, margin: "0 8px" }}>{ prettyBytes(size) } • Prints { dayjs(Date.now() + gcodeAnalysis.estimatedPrintTime * 1000).fromNow() } • lol</span>
			</span>
		</ListItem>
	);
}
