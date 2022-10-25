import { NAVIGATE_TO_URI, NEW_TAB_URI } from "./config";

export const setupEmergencyButton = () => {
	const btn = <HTMLButtonElement>document.getElementById("emergency-button");
	btn?.addEventListener("click", () => {
		// The order of these statements below matter. If we replace the location before opening
		// the other URL, the "window.open" line would have no effect.
		window.open(NEW_TAB_URI, "_blank");
		location.replace(NAVIGATE_TO_URI);
	});
};

export const setupResetButton = () => {
	const btn = <HTMLButtonElement>document.getElementById("reset-button");
	btn?.addEventListener("click", () => {
		window.location.reload();
	});
};

export const setupHeaderButton = () => {
	const btn = <HTMLButtonElement>document.getElementById("header-button");
	const header = <HTMLElement>document.getElementById("mobile-header");
	btn?.addEventListener("click", () => {
		header.classList.toggle("max-md:hidden");
	});
};
