import "./main.css";
import { initializeForms } from "./ts/form";
import { setupHamburger } from "./ts/hamburger";
import { initializeMap } from "./ts/map";
import "@fontsource/ubuntu/latin.css";
import { setupLegend } from "./ts/legend";
import { setupEmergencyButton, setupResetButton } from "./ts/buttons";
import { addGoatCounter } from "./ts/goatcounter";

document.addEventListener("DOMContentLoaded", () => {
	initializeMap();
	initializeForms();
	setupHamburger();
	setupLegend();
	setupEmergencyButton();
	setupResetButton();

	if (import.meta.env.VITE_QUEER_LEXIKON_PRIVATE === "true") {
		addGoatCounter();
	}
});
