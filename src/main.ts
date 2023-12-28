// import App from "./App.svelte";
import App from "./App.svelte";
import "./menu-theme.scss";
import { writable, type Writable } from "svelte/store";

const teacherState = writable(true);
const loadState = writable(false);
const chatState = writable(false);
const pageName = location.pathname.split("/").reverse()[0].replace("#", "");
const searchState: Writable<string> = writable("Ara");
const aac_menu = new App({
  target: document.querySelector("#head-wrapper") as HTMLElement,
  props: {
    teacherState,
    loadState,
    chatState,
    page: pageName || "word",
    searchState,
  },
});
aac_menu.loadState = loadState;
aac_menu.chatState = chatState;

//@ts-ignore
self.app = aac_menu;
export default aac_menu;
