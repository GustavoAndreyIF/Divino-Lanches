import { DomHeaderFooter } from "./utils/RenderHeaderFooter.js";
import { DomMain } from "./utils/ManagerDOM.js";
import { EventManager } from "./utils/ManagerEvent.js";

document.addEventListener("DOMContentLoaded", async () => {
	const domHeaderFooter = new DomHeaderFooter();
	await domHeaderFooter.initialize();

	const domMain = new DomMain("main");
	const eventManager = new EventManager(domMain);

	eventManager.initializeEvents();

	domMain.loadPage("./pages/home.html", eventManager.loadHomePage.bind(eventManager));
});
