import mergeDefaults from "./merge";

export default async function api(path: string, params: RequestInit = {}): Promise<Response> {
	return await fetch(`https://octoprint.joshmerlino.me${path}`, <RequestInit>mergeDefaults(params, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("api-key")}`
		}
	}));
}
