import mergeDefaults from "./merge";

export default async function api(path: string, params: RequestInit = {}): Promise<Response> {
	return await fetch(`//${APP_CONFIG.octoprint.hostname}:${APP_CONFIG.octoprint.port}${path}`, <RequestInit>mergeDefaults(params, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"X-Api-Key": "B79BAF95899747859D04C47EE4F17C89"
		}
	}));
}
