declare global {
	interface Window {
		goatcounter: {
			path: (p: any) => string;
		};
	}
}

export const addGoatCounter = () => {
	window.goatcounter = {
		path: function (p: any) {
			return location.host + p;
		},
	};

	let goatcounter = document.createElement("script");
	goatcounter.src = "//glutamat.queer-lexikon.net/script.js";
	goatcounter.defer = true;
	goatcounter.setAttribute("data-website-id", "6e91c72c-29ef-4464-92b8-1a7d780bec01");

	document.head.appendChild(goatcounter);
};
