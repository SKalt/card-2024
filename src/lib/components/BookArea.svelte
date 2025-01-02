<script lang="ts">
  import { tick } from "svelte";
  import { getContext, onMount, type Snippet } from "svelte";
  import { snake_case, defaultStyle, recommendedStyle, type Coords } from "../utils";
  import HoverableArea from "./HoverableArea.svelte";
  import { type Writable } from "svelte/store";
  import { pushState } from "$app/navigation";
  import { page } from "$app/state";
  let {
    title = "",
    author = "",
    coords = [],
    recommended = false,
    html = "",
  }: {
    title: string;
    author: string;
    coords: Coords;
    recommended: boolean;
    html?: string;
  } = $props();
  const slug = snake_case(title);
  const href = `#${slug}`;
  const alt = title + author ? ` by ${author}` : "";
  const setStyle = recommended ? recommendedStyle : defaultStyle;

  let pinned = $derived.by(() => snake_case(page.state.title ?? "") === slug);
  onMount(() => {
    const _hash = globalThis.location?.hash ?? "";
    if (!page.state.title && _hash && _hash === href) {
      tick().then(() => pushState(href, { title }));
    }
  });
  $effect(() => {
    if (pinned) {
      getContext<Writable<any[]>>("drawCallbacks")?.update((ident) => [...ident]);
      // console.log("pinned", title);
      sideStore.set(side as Snippet);
    } // else, other books/hover areas clear the title, etc.
  });
  // // just for the shape editor; can be removed later.
  // import { writable, type Readable } from "svelte/store";
  // import ShapeEditor from "./ShapeEditor.svelte";
  // let ratio: number = $state(1);
  // const ratioStore: Readable<number> = getContext("ratioStore");
  // ratioStore.subscribe((r) => (ratio = r));
  // let canvas: HTMLCanvasElement | null = $state(null);
  // const canvasStore: Readable<HTMLCanvasElement | null> = getContext("canvasStore");
  // canvasStore.subscribe((c) => (canvas = c));
  // const shapeStore = writable<Coords>(coords);
  // shapeStore.subscribe((s) => (coords = s)); // ????

  const sideStore: Writable<Snippet | null> = getContext("side");
  const onclick = (e: MouseEvent) => {
    e.preventDefault();
    pushState(href, { title });
  };
</script>

{#snippet side()}
  <div>
    <!-- <ShapeEditor {shapeStore} {ratio} {canvas} /> -->
    <h1>{title}</h1>
    <p>
      {#if author}
        by <em>{author}</em>
      {/if}
      {#if recommended}<span>🌟 (recommended)</span>{/if}
    </p>
    {@html html}
  </div>
{/snippet}

<HoverableArea {setStyle} {coords} {href} title={alt} {onclick} {pinned} />
