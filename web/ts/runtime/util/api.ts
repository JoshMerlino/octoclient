import mergeDefaults from "./merge";

export default async function api(path: string, params: RequestInit = {}): Promise<Response> {
	return await fetch(`http://${APP_CONFIG.octoprint.hostname}:${APP_CONFIG.octoprint.port}${path}`, <RequestInit>mergeDefaults(params, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("api-key")}`
		}
	}));
}
