import "./main.css";
import { initializeForms } from "./ts/form";
import { setupHamburger } from "./ts/hamburger";
import { initializeMap } from "./ts/map";
import "@fontsource/ubuntu/latin.css";
import { setupLegend } from "./ts/legend";
import { setupEmergencyButton } from "./ts/emergency-button";

document.addEventListener("DOMContentLoaded", () => {
	initializeMap();
	initializeForms();
	setupHamburger();
	setupLegend();
	setupEmergencyButton();
});
