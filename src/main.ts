// import App from "./App.svelte";
import App from "./App.svelte";
import "./menu-theme.scss";
import { writable, type Writable } from "svelte/store";
import { User, type PageName } from "./menu-type";

const teacherState = writable(true);
const loadState = writable(false);
const chatState = writable(false);
const userStore: Writable<User> = writable(undefined);
const pageName: PageName = location.pathname
  .split("/")
  .reverse()[0]
  .replace("#", "") as PageName;
const searchState: Writable<string> = writable("Ara");
const aac_menu = new App({
  target: document.querySelector("#head-wrapper") as HTMLElement,
  props: {
    teacherState,
    loadState,
    chatState,
    page: pageName || "word",
    searchState,
    userStore,
  },
});
aac_menu.loadState = loadState;
aac_menu.chatState = chatState;
aac_menu.setUser = (user: User) => {
  userStore.update(() => User.wrap(user));
};

//@ts-ignore
self.app = aac_menu;
export default aac_menu;
