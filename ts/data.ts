import data from "../data/orgas.json";

export const loadJSON = async () => {
	if (!import.meta.env.VITE_QUEER_LEXIKON_BACKEND_URL) {
		console.warn("The backend URL is not defined, using compiled JSON as fallback.");
		return data;
	}

	const resp = await fetch(import.meta.env.VITE_QUEER_LEXIKON_BACKEND_URL);

	if (!resp.ok) {
		console.warn("Loading the data from the backend failed, using compiled JSON as fallback.");
		return data;
	}

	return resp
		.json()
		.then((json) => {
			return json;
		})
		.catch((error) => {
			console.warn("Loading JSON from returnd content failed, using compiled JSON as fallback.");
			return data;
		});
};
