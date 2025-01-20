import { DomHeaderFooter } from "./utils/domHeaderFooter.js";
import { DomMain } from "./utils/domMain.js";
import { EventManager } from "./utils/eventManager.js";

document.addEventListener("DOMContentLoaded", async () => {
	const domHeaderFooter = new DomHeaderFooter();
	await domHeaderFooter.initialize();

	const domMain = new DomMain("main");
	const eventManager = new EventManager(domMain);

	eventManager.initializeEvents();

	domMain.loadPage("./pages/home.html", eventManager.loadHomePage.bind(eventManager));
});
