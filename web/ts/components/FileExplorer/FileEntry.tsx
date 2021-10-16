
import humanizeDuration from "humanize-duration";
import { ListItem, TextIcon } from "photoncss/lib/react";
import prettyBytes from "pretty-bytes";
import React from "react";

export default function File({ display, size, gcodeAnalysis }: Octo.File): JSX.Element {
	return (
		<ListItem style={{ height: 56, position: "relative"}}>
			<TextIcon variant="outlined">description</TextIcon>
			<span style={{ marginTop: -8, marginLeft: -8, position: "absolute" }}>
				<h4 style={{ opacity: .54, margin: "0 8px", marginBottom: -4 }}>{ display }</h4>
				<span style={{ fontSize: 14, margin: "0 8px" }}>{ prettyBytes(size) } • { humanizeDuration(Math.ceil(gcodeAnalysis.estimatedPrintTime * 1000), { largest: 2, maxDecimalPoints: 0 }) }</span>
			</span>
		</ListItem>
	);
}
