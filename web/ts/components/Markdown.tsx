/* eslint no-invalid-this: off */
import { guid } from "photoncss";
import React, { useEffect } from "react";
import Markdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import Prism from "prismjs";
import $ from "jquery";

export type Props = { children: string };

export function highlight(lang: string, text: string): string {
	if (lang.toLowerCase() === "json") lang = "js";
	if (lang.toLowerCase() === "ts") lang = "js";
	if (lang.toLowerCase() === "typescript") lang = "js";
	const grammer = Prism.languages.hasOwnProperty(lang.toLowerCase()) ? Prism.languages[lang.toLowerCase()] : Prism.languages.markup;
	return Prism.highlight(text, grammer, lang);
}

export default function Component({ children }: Props): JSX.Element {
	const id = guid();

	useEffect(function(){
		$(`#${id}`)
			.children("pre")
			.children("code")
			.each(function() {
				const lang = $(this).attr("class")!.split("language-")[1];
				$(this).html(highlight(lang!, $(this).text()));
			});
	});

	return (
		<div className="md-container" id={id}>
			<Markdown plugins={[ gfm ]} source={children}/>
		</div>
	);
}
