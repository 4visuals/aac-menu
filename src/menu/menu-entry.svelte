<script>
  export let teacher = true;
  export let page;
  export let loaded;
  export let menu;
  export let closeMenu;
  // on:click={closeMenu}
  export let searchState;

  let activeMenu = null;
  let children = [];
  // console.log("[TEACHER]", $teacher);

  const filterMenuEntries = () => {
    if (activeMenu.id === "menu-sentence-writing" && loaded === "READING") {
      return menu.children.filter((entry) => {
        return "writing-scene" !== entry.cmd;
      });
    } else {
      return menu.children;
    }
  };

  $: {
    activeMenu = menu;
    children = filterMenuEntries();
  }
  const classValue = (item) => {
    return item.clazz;
  };
  const toggle = (item) => {
    if (menu.visible !== "always" && !loaded) {
      return undefined;
    }
    return (item.props && item.props.toggle) || undefined;
  };
  const target = (item) => {
    if (menu.visible !== "always" && !loaded) {
      return undefined;
    }
    return (item.props && item.props.target) || undefined;
  };
  const cmd = (item) => (item.props && item.props.cmd) || undefined;

  const actionButtonClicked = (e, parentMenu) => {
    if (parentMenu.keepalive) {
      return;
    }
    if (parentMenu.visible === "always" || loaded) {
      closeMenu(e);
    }
  };
</script>

<div
  on:click
  on:mouseover
  class="menu-entry {menu.box || 'inline'}"
  class:disabled={menu.visible !== "always" && !loaded}
>
  <div class="desc">
    {#if menu.icon}
      <span class={menu.icon.clazz}>{menu.icon.text}</span>
    {/if}
    <span class="desc-text">{menu.text}</span>
  </div>
  <!-- <p>{menu.desc}</p> -->
  {#if menu.prop && menu.prop.type === "radio"}
    {#if menu.children.length > 0}
      <div
        class="btn-area"
        style="display: flex;justify-content: space-between;"
      >
        {#each menu.children as item}
          <label class="aac-form-label"
            ><input
              type="radio"
              class="aac-form"
              name={menu.prop.name}
              value={item.value}
              bind:group={$searchState}
            /><span>{item.text}</span></label
          >
        {/each}
      </div>
    {/if}
  {:else}
    {#if menu.children.length > 0}
      <div class="btn-area">
        {#each children as item}
          {#if item.teacherOnly && !$teacher}{:else}
            <button
              class:disabled={menu.visible !== "always" && !loaded}
              on:click={(e) => actionButtonClicked(e, menu)}
              id={item.cmd}
              data-toggle={toggle(item)}
              data-target={target(item)}
              data-cmd={cmd(item)}
              class="aac-action-btn {classValue(item)}"
              >{@html item.text}</button
            >
          {/if}
        {/each}
      </div>
    {/if}
    {#if menu.children.length === 0}
      <p>내용 없음</p>
    {/if}
  {/if}
</div>

<style lang="scss">
  .menu-entry {
    padding: 8px 8px 8px 36px;
    &.disabled {
      color: #9c9c9c !important;
    }
    &:not(.inline) {
      .btn-area {
        margin-top: 0.75rem;
      }
    }
    .desc {
      font-weight: 400;
      font-size: 1em;
      display: flex;
      position: relative;

      & > .material-icons {
        position: absolute;
        left: -26px;
        font-size: 18px;
        margin-top: 3px;
      }
      & > .desc-text {
        flex: 1 0 auto;
      }
    }
    p {
      margin: 0;
      font-size: 0.9em;
    }
    .btn-area {
      text-align: right;
    }
    &:hover {
      background-color: #ffffdd;
    }
    button {
      border: 1px solid transparent;
      background-color: #ddddddaa;
      color: #555;
      border-radius: 2rem;
      font-size: 0.9rem;
      padding: 0.5rem 0.75rem;
      margin: 0;
      outline: none;
      margin-left: 2px;
      &:not(.disabled):hover {
        background-color: #eee;
        border-color: #555;
      }
      &.disabled {
        background-color: #efefef;
        color: #9c9c9c;
        font-weight: 300;
        cursor: not-allowed;
      }
      &.learn {
        background-color: #ffe3f7;
        color: #340828;
        &:hover {
          border-color: #bf3199;
          background-color: #fff0fb;
        }
        &:active {
          background-color: #ddc1d6;
        }
      }
      &.quiz {
        background-color: #e2f1ff;
        color: #0a2740;
        &:hover {
          border-color: #3c78ab;
          background-color: #f4faff;
        }
        &:active {
          background-color: #c4d4e0;
        }
      }
    }
  }
  .inline.menu-entry {
    display: flex;
    align-items: center;
    .desc {
      flex: 1 0 auto;
    }
  }
</style>
