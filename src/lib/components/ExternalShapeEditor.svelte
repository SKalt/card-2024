<script lang="ts">
  import { snake_case, defaultStyle as setStyle } from "$lib/utils";
  import HoverableArea from "./HoverableArea.svelte";
  const {
    coords,
    title = "",
    href = "",
  } = $props<{ coords: Array<[number, number]>; title: string; href: string }>();
  let download = $state("");
  let downloadUrl = $state("");
  let done = $state(false);
  const onclick = () => {
    done = true;
    let shelf = prompt("shelf path");
    if (!shelf) return;
    const href = `${shelf}`;
    downloadUrl = `data:application/octet-stream;base64,${btoa(JSON.stringify({ href: shelf, shape: coords }))}`;
    download = snake_case(title) + ".json";
    console.log("book: " + href);
  };
</script>

{#if downloadUrl}
  <div data-sveltekit-preload-data="false">
    <a
      {download}
      href={downloadUrl}
      onclick={() => (downloadUrl = "")}
      style="position: absolute; top:0;"
    >
      Download
    </a>
  </div>
{/if}
{#if !done}
  <HoverableArea alt={title} {href} {setStyle} {coords} {onclick} />
{/if}
