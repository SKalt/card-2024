<script lang="ts">
  let open = false;
  export let right: string = "";
  export let left: string = "";
  export let up: string = "";
  export let down: string = "";
  const toggle = () => {
    open = !open;
    window.history.replaceState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  };
</script>

<div class:open>
  <!-- the hamburger: toggles the menu -->
  <button on:click={toggle}>
    {#if open}
      &times;
    {:else}
      &equiv;
    {/if}
  </button>
  <nav>
    <ul>
      <li><a href="../">back to index</a></li>
      {#if up}
        <li><a href={up}>up</a></li>
      {/if}
      {#if left}
        <li><a href={left}>left</a></li>
      {/if}
      {#if right}
        <li><a href={right}>right</a></li>
      {/if}
      {#if down}
        <li><a href={down}>down</a></li>
      {/if}
    </ul>
  </nav>
</div>

<style>
  .open button {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
  }
  nav {
    display: none;
  }
  .open nav {
    display: block;
  }
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  li {
    margin: 1ch;
  }
  div {
    position: fixed;
    top: 0;
    right: 0;
    padding: 1ch;
    z-index: 1;
  }
  div.open {
    /* centered */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(256, 256, 256, 0.85);
    padding: 2rem;
    max-width: 800px;
    max-height: 400px;
    width: 80vw;
  }
</style>
