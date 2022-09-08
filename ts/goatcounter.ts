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
	goatcounter.src = "//ziege.queer-lexikon.net/count.js";
	goatcounter.async = true;
	goatcounter.setAttribute("data-goatcounter", "https://ziege.queer-lexikon.net/count");

	document.head.appendChild(goatcounter);
};
