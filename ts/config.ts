import defaultImage from "../assets/default.svg";
import limitedImage from "../assets/limited.svg";
import supportImage from "../assets/support.svg";

export const ICON_SIZE: L.PointExpression = [56, 56];
export const DEFAULT_ZOOM_LEVEL = 11;
export const MAX_ZOOM_LEVEL = 17;
export const MIN_ZOOM_LEVEL = 6;

export const NAVIGATE_TO_URI = "https://www.google.com/search?&q=wikipedia";
export const NEW_TAB_URI = "https://de.wikipedia.org/wiki/Wikipedia:Hauptseite";

export const LEGEND_MAPPING = new Map<string, [string, string]>();
LEGEND_MAPPING.set("default", [defaultImage, "Allgemeines"]);
LEGEND_MAPPING.set("support", [supportImage, "Unterstützung und Beratung"]);
LEGEND_MAPPING.set("limited", [limitedImage, "eingeschränkte Zielgruppe"]);
