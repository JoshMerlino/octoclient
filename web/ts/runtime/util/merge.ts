/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export default function mergeDefaults(config: any, defaults: any) {
	if (config === null || config === undefined) return defaults;
	for (const attrname in defaults) {
		if (defaults[attrname].constructor === Object) config[attrname] = mergeDefaults(config[attrname], defaults[attrname]);
		else if (config[attrname] === undefined) config[attrname] = defaults[attrname];
	}
	return config;
}
