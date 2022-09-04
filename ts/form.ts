import { DEFAULT_ZOOM_LEVEL } from "./config";
import { getMap } from "./map";

export const initializeForms = () => {
	const forms = document.querySelectorAll("form");
	forms.forEach((f) => initializeForm(f));
};

function initializeForm(form: HTMLFormElement) {
	form.addEventListener("submit", async (e) => {
		const val = form.querySelector<HTMLInputElement>("input[name=city]")!.value;
		e.preventDefault();

		// Documentation: https://nominatim.org/release-docs/latest/api/Search/#result-limitation
		const u = new URL("https://nominatim.openstreetmap.org/search");
		u.search = new URLSearchParams({
			q: val,
			format: "json",
			countrycodes: "de,at,ch", // comma-separated list of supported countries.
			limit: "1", // only interested for first entry
		}).toString();

		try {
			const resp = await fetch(u);
			const json = await resp.json();

			if (!json || !Array.isArray(json)) {
				console.error("expected array as JSON, got: ", json);
				return;
			}

			if (json.length === 0) {
				// TODO: report no results to user!
				return;
			}

			const first = json[0];
			getMap().setView([first.lat, first.lon], DEFAULT_ZOOM_LEVEL);
		} catch (error) {
			console.error("fetching information for search input failed:", error);
		}
	});
}
