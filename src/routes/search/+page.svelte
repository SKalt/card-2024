<script lang="ts">
  import { base } from "$app/paths";
  import HamburgerNav from "$lib/components/HamburgerNav.svelte";
  import { snake_case } from "$lib/utils";
  import Fuse from "fuse.js/min-basic";
  let searchInput = $state("");
  const md = Object.entries(
    import.meta.glob<
      true,
      string,
      {
        attributes: { title: string; author: string; recommended?: boolean };
        html: string;
      }
    >("../../../content/shelves/**/*.md", { eager: true }),
  ).map(([k, v]) => {
    const { title, author, recommended } = v.attributes;
    const path = k.split("/shelves/")[1].split("/");
    path.pop();
    if (!title) {
      console.log(k);
    }
    const href = path.join("/") + "#" + snake_case(title || "");
    return {
      href,
      title,
      author,
    };
  });
  const index = new Fuse(md, {
    keys: ["title", "author"],
    includeScore: true,
    threshold: 0.3,
  });
  let results = $derived.by(() => {
    if (!searchInput) return [];
    return index.search(searchInput).map((r) => r.item);
    // .slice(10);
  });
</script>

<svelte:head>
  <title>Search</title>
</svelte:head>
<div>
  <HamburgerNav />
  <form style="padding: 1em; margin: auto;">
    <search>
      <label for="search">Search books</label>
      <input type="search" id="search" bind:value={searchInput} placeholder="Title or author" />
    </search>
    <hr />
    <output>
      {#if results.length === 0}
        <p>No results</p>
      {:else}
        <ul>
          {#each results as { href, title, author }}
            <li>
              <a href={base + href.startsWith("/") ? href : "/" + href}>{title}</a> by
              <em>{author}</em>
            </li>
          {/each}
        </ul>
      {/if}
    </output>
  </form>
</div>

<style>
  #search {
    width: 100%;
  }
</style>
