<script>
  // export let activeEntry;
  // export let prev, next;
  import MenuEntry from "./menu-entry.svelte";
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  export let teacher;
  export let page;
  export let menu;
  export let loaded; // [true, false, 'READING', 'SENTENCE']
  export let searchState;

  let activeEntry = null;
  let activeMenu = null;
  let entries = [];
  const filterMenuEntries = () => {
    if (activeMenu.id === "menu-sentence-study" && loaded === "READING") {
      return menu.children.filter((entry) => {
        return "menu-list-words,menu-sentence-cards,menu-sentence-ordering,menu-symbol-sentence,menu-sentence-writing-two,menu-sentence-writing-three,menu-sentence-writing-five".includes(
          entry.id
        );
      });
    } else {
      return menu.children;
    }
  };
  $: {
    activeMenu = menu;
    entries = filterMenuEntries();
    activeEntry = null;
  }
  let isTeacher;
  teacher.subscribe((state) => {
    isTeacher = state;
  });
  const dispatch = createEventDispatcher();
  const closeMenu = (event) => {
    const { target, currentTarget } = event;
    if (
      target === currentTarget ||
      currentTarget.classList.contains("btn-close")
    ) {
      dispatch("close", { event });
    }
  };

  const showDesc = (menu) => {
    activeEntry = menu;
  };
</script>

<div
  class="popup-bg menu-theme-default"
  in:fade={{ duration: 150 }}
  out:fade={{ duration: 50 }}
  on:click={closeMenu}
>
  <div class="popup-area" on:click={() => {}}>
    <div class="header">
      <!-- <h4 class="title">{menu.text}</h4> -->
      <p class="title">{activeEntry ? activeEntry.desc : menu.text}</p>
      <a class="btn-close" href={"#"} on:click={closeMenu}
        ><span class="icon-x lg" /></a
      >
    </div>

    <div class="popup-body">
      {#each entries as child}
        {#if child.teacherOnly === true && !isTeacher}
          <div />
        {:else}
          <MenuEntry
            {teacher}
            {page}
            menu={child}
            {closeMenu}
            {loaded}
            {searchState}
            on:mouseover={() => showDesc(child)}
            on:click={() => showDesc(child)}
          />
        {/if}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .popup-bg {
    position: sticky;
    height: calc(100vh - 100px);
    // background-color: #f4f4f499;
    .popup-area {
      font-size: 1.2rem;
      position: absolute;
      top: 1rem;
      left: 50%;
      width: calc(100% - 0rem);
      max-width: 560px;
      max-height: calc(100% - 1rem);
      transform: translateX(-50%);
      background-color: white;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 16px #00000044;

      @media screen and (max-width: 560px) {
        & {
          top: 0;
          max-height: 100%;
          box-shadow: none;
        }
      }

      // border-radius: 8px;
      // box-shadow: 0px 5px 20px -5px #3a3a3abf;
      .header {
        position: relative;
        .title {
          padding: 0.75rem;
          padding-right: 3rem;
          margin: 0;
          font-weight: 300;
          height: 72px;
          color: #004775;
        }
      }
      .popup-body {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        user-select: none;
      }
    }
    .btn-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      line-height: 1;
    }
    @media screen and (max-height: 600px) and (orientation: landscape) {
      .popup-area {
        .header {
          .title {
            height: 40px;
          }
          .btn-close {
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
</style>
