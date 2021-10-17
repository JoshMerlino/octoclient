import React from "react";
import Markdown from "./Markdown";

export type Props = { language: string, children: string };
export default function Code({ language, children }: Props): JSX.Element {
	return (
		<div className="only-code">
			<Markdown>{`\`\`\`${language}\n${children}\n\`\`\``}</Markdown>
		</div>
	);
}
