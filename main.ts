import "./main.css";
import { initializeForms } from "./ts/form";
import { setupInfoButton } from "./ts/info-menu";
import { initializeMap } from "./ts/map";
import "@fontsource/ubuntu/latin.css";
import { setupLegend } from "./ts/legend";
import { setupEmergencyButton, setupResetButton, setupHeaderButton } from "./ts/buttons";
import { addGoatCounter } from "./ts/goatcounter";

document.addEventListener("DOMContentLoaded", () => {
	initializeMap();
	initializeForms();
	setupInfoButton();
	setupLegend();
	setupEmergencyButton();
	setupResetButton();
	setupHeaderButton();

	if (import.meta.env.VITE_QUEER_LEXIKON_PRIVATE === "true") {
		addGoatCounter();
	}
});
