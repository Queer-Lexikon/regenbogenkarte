const openClass = "open";

export const setupInfoButton = () => {
	const menu = document.getElementById("menu")!;
	const openBtn = document.getElementById("open-menu-btn")!;
	const closeBtn = document.getElementById("close-menu-btn")!;

	const elems = [menu, document.body];
	let isOpen = false;
	const openMenu = () => {
		isOpen = true;
		elems.forEach((e) => e.classList.add(openClass));
		openBtn.setAttribute("aria-expanded", "true");
		closeBtn.focus(); // a11y: focus the element that can close the menu
	};
	const closeMenu = () => {
		isOpen = false;
		elems.forEach((e) => e.classList.remove(openClass));
		openBtn.setAttribute("aria-expanded", "false");
		openBtn.focus(); // a11y: focus the element that can opened the menu
	};

	openBtn.addEventListener("click", () => openMenu());
	closeBtn.addEventListener("click", () => closeMenu());
	document.body.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) closeMenu();
	});
};
