import { LEGEND_MAPPING } from "./config";

export const setupLegend = () => {
	const template = <HTMLTemplateElement>document.getElementById("legend-list-entry");
	const lists = document.querySelectorAll<HTMLElement>("[data-id=legend-list]");

	lists.forEach((l) => {
		for (const [_, [icon, text]] of LEGEND_MAPPING) {
			const copy = <HTMLElement>template.content.cloneNode(true);
			const img = copy.querySelector("img")!;
			img.src = icon;

			const description = copy.querySelector("span")!;
			description.innerText = text;

			l.appendChild(copy);
		}
	});
};
