import defaultTranslations from "../../translations.yml";
const translations = { ...APP_MANIFEST, ...defaultTranslations };

export default function f(key: string): string {
	const translated = translations[key];
	if (translated in translations) return f(translated);
	if (translated === undefined) return key;
	return translated;
}

console.log(f("name"), translations);
