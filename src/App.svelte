<svelte:options accessors={true} />

<script lang="ts">
  import type { Writable } from "svelte/store";
  import PopupMenu from "./menu/popup-menu.svelte";
  import type { MenuList, MenuModel, PageName, User } from "./menu-type";
  import { word } from "./menu/word-menu";
  import { sentence } from "./menu/sentence-menu";
  import { reading } from "./menu/reading-menu";
  import { pub } from "./menu/pub-menu";
  import { board } from "./menu/board-menu";

  export let teacherState:Writable<boolean>;
  export let loadState:Writable<boolean | 'READING' | 'SENTENCE'>;
  export let chatState:Writable<boolean>;
  export let page:PageName;
  export let searchState:Writable<string>;
  export let userStore:Writable<User>;

  

  let loaded: boolean | 'READING' | 'SENTENCE' = false; // [false, true, 'READING', 'SENTENCE']

  let activeMenu: MenuModel = null;
  loadState.subscribe((state) => {
    loaded = state;
  });

  let chatting = false;
  chatState.subscribe((state) => {
    chatting = state;
  });

  let isTeacher = false;
  teacherState.subscribe((state) => {
    isTeacher = state;
  });

  let share = [
    board[0],
    board[1],
    board[2],
    board[3]
    //board[4]
  ]
  let menuList:MenuList = { word, sentence, reading, pub, board, share };

  let menus = menuList[page];

  let prevMenu, nextMenu;

  const openMenuPopup = (menu: MenuModel) => {
    if (menu.visible !== "always" && !loaded) {
      return;
    }
    activeMenu = menu;
    let popups = filterMenu((m) => m.children.length > 0);
    const idx = popups.findIndex((m) => m === activeMenu);
    prevMenu = idx === 0 ? null : popups[idx - 1];
    nextMenu = idx + 1 === popups.length ? null : popups[idx + 1];

    document.body.classList.add("fill-h");
  };
  const clearMenu = () => {
    activeMenu = undefined;
    document.body.classList.remove("fill-h");
  };
  const filterMenu = (fn: (menu:MenuModel) =>boolean) => menus.filter(fn);

  const filterMenuWhenPub = () => {
    const filtered = filterMenu((m) => !!m.cmd && $userStore && $userStore.userLevel >= m.level.value);
    if ((page === "pub" || page === "reading") && loaded !== "SENTENCE") {
      const idx = filtered.findIndex((m) => m.id === "menu-print-sentence");
      filtered.splice(idx, 1);
    }
    return filtered;
  };
</script>

<div id="menu-wrapper">
  <div id="toolbar" class="d-flex no-bottom-radius">
    {#each filterMenu((m) => m.children.length > 0) as menu (menu.id)}
      <a
        class="tool-item"
        class:disabled={menu.visible !== "always" && !loaded}
        class:active={menu === activeMenu}
        id={menu.id}
        href={"#"}
        on:click|preventDefault={() => openMenuPopup(menu)}
      >
        {#if menu.icon}
          <span class="material-icons" style="vertical-align: middle"
            >{menu.icon.text}</span
          >
        {/if}
        {@html menu.text}</a
      >
    {/each}
    <div
      class:ml-auto={menus.filter((m) => m.children.length > 0).length > 0}
      class="text-nowrap cmd-bar"
    >
      <a href={"#"} class="ctrl tool-item" data-cmd="folding-cmd-bar"
        ><span class="material-icons">more_vert</span></a
      >
      <div class="cmd-bar-body">
        {#each filterMenuWhenPub() as menu (menu.id)}
          <a
            class="tool-item {menu.clazz || undefined} {menu.id ===
              'menu-chat-mode' && chatting
              ? 'enabled'
              : undefined}"
            class:disabled={menu.visible !== "always" && !loaded}
            href={"#"}
            on:click|preventDefault={() => {}}
            data-cmd={menu.cmd || undefined}
            data-toggle={menu.props && menu.props.toggle}
            data-target={menu.props && menu.props.target}
            ><span class="tool-icon {menu.icon.clazz || undefined}"
              >{menu.icon.text}</span
            >{#if menu.text}<span class="item-text"
                >{@html menu.text.trim()}</span
              >{/if}</a
          >
        {/each}
      </div>
    </div>
  </div>
</div>
{#if activeMenu}
  <PopupMenu
    on:close={clearMenu}
    on:active-menu={(e) => openMenuPopup(e.detail.menu)}
    teacher={teacherState}
    {loaded}
    {userStore}
    {searchState}
    menu={activeMenu}
  />
{/if}
