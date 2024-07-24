import L from "leaflet";
import "leaflet.markercluster";

import "leaflet/dist/leaflet.css";

import defaultImage from "../assets/default.svg";
import limitedImage from "../assets/limited.svg";
import supportImage from "../assets/support.svg";
import { DEFAULT_ZOOM_LEVEL, ICON_SIZE, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "./config";
import { loadJSON as loadData } from "./data";

type OrgEmail = {
	label: string;
	email: string;
};

type OrgPhone = {
	label: string;
	phone: string;
};

type OrgWebsite = {
	label: string;
	url: string;
};

type Organisation = {
	country: string;
	state: string;
	name: string;
	emails: OrgEmail[];
	websites: OrgWebsite[];
	phones: OrgPhone[];
	location: {
		address?: string;
		lon: number;
		lat: number;
		approx?: boolean;
	};
	activities?: string;
	identities?: string;
	age_restriction?: string;
};

let map: L.Map;
export async function initializeMap() {
	map = L.map("map").setView([51.351, 10.454], MIN_ZOOM_LEVEL); // focus on germany
	document.querySelectorAll(".locate-button").forEach((item) => {
		item.addEventListener("click", (event) => {
			map.locate({ setView: true, maxZoom: DEFAULT_ZOOM_LEVEL });
		});
	});

	L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png", {
		maxZoom: MAX_ZOOM_LEVEL,
		minZoom: MIN_ZOOM_LEVEL,
		attribution: "© OpenStreetMap",
	}).addTo(map);

	var markers = L.markerClusterGroup({
		// Displaying the areas of each cluster is not intended. It might confuse our users
		// and provides no benefit.
		showCoverageOnHover: false,

		// The default lines are barely visible, especially on the German map. Therefore, thicker
		// and more visible lines are placed.
		spiderLegPolylineOptions: {
			color: "black",
			opacity: 0.8,
			weight: 2,
		},

		// Our icons are too large for the default multiplier, this increases the distance between the elements.
		// Maybe we should even increase it further to improve the usability on mobile devices.
		spiderfyDistanceMultiplier: 2,

		// Reduce the cluster radius from 80px to 20px. This creates more and smaller clusters.
		maxClusterRadius: 20,

		// Let's use the default icon for our clusters and place a white circle inside of it.
		iconCreateFunction: (cluster) => {
			return new L.DivIcon({
				html: `<div>
				<img src="${defaultImage}" alt=""/>
				<span class="rounded-full bg-white absolute top-[10px] bottom-[13px] inset-x-3 flex justify-center items-center font-semibold text-sm">${cluster.getChildCount()}</span></div>`,
				className: "", // empty className, so leaflet does not set any defaults.
				iconSize: ICON_SIZE,
			});
		},
	});
	const data = await loadData();
	data.forEach((row: Organisation) => {
		const marker = createMarker(row);
		if (marker) markers.addLayer(marker);
	});
	map.addLayer(markers);
}

const defaultIcon = L.icon({
	iconUrl: defaultImage,
	iconSize: ICON_SIZE,
});
const limitedIcon = L.icon({
	iconUrl: limitedImage,
	iconSize: ICON_SIZE,
});
const supportIcon = L.icon({
	iconUrl: supportImage,
	iconSize: ICON_SIZE,
});

const createMarker = (e: Organisation): L.Marker | undefined => {
	const marker = L.marker([e.location.lon, e.location.lat], { alt: e.name }).bindPopup(
		buildContent(e),
		{ className: "map-popup" },
	);

	if (e.identities && e.identities !== "") {
		marker.setIcon(limitedIcon);
	} else if (e.activities && e.activities.toLowerCase().includes("beratung")) {
		marker.setIcon(supportIcon);
	} else {
		marker.setIcon(defaultIcon);
	}

	return marker;
};

const buildContent = (o: Organisation): string => {
	let result = `
  <h3 class="font-semibold text-base">${o.name}</h3>
<address class="inline">${o.location.address ?? "auf Nachfrage"}</address>
<ul class="list-disc my-4 pl-2 list-inside">`;

	o.websites.forEach((website) => {
		result += `<li class="contact-website"><a href="${website.url}">${website.label}</a></li>`;
	});
	o.emails.forEach((email) => {
		result += `<li class="contact-email"><a href="mailto:${email.email}">${email.label}</a></li>`;
	});
	o.phones.forEach((phone) => {
		result += `<li class="contact-phone">${phone.label}: <a href="tel:${phone.phone}">${phone.phone}</a></li>`;
	});
	result += `</ul>`;

	if (o.activities && o.activities !== "")
		result += `<h4 class="font-semibold">Aktivitäten</h4>
<p>${o.activities}</p>`;

	if (o.identities && o.identities !== "")
		result += `<h4 class="font-semibold">Identitäten</h4>
<p>${o.identities}</p>`;

	if (o.age_restriction && o.age_restriction !== "")
		result += `<h4 class="font-semibold">Altersbeschränkung</h4><p>vorhanden: ${o.age_restriction}</p>`;

	if (o.location.approx) {
		result += `<p class="text-xs !mt-2">Bei den Daten handelt es sich um eine ungefähre Ortsangabe. Die genaue Adresse erfährst du auf Nachfrage.</p>`;
	}

	return result;
};

export const getMap = (): L.Map => map;
