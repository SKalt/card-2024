<script lang="ts">
  import { onMount, setContext, type Snippet } from "svelte";
  import type { Picture } from "vite-imagetools";
  import ImgOverlay from "./ImgOverlay.svelte";
  import HoverableArea from "./HoverableArea.svelte";
  import BookArea from "./BookArea.svelte";
  import { defaultStyle, type Book, type Coords } from "$lib/utils";
  import { writable } from "svelte/store";
  import { pushState } from "$app/navigation";
  import ExternalShapeEditor from "./ExternalShapeEditor.svelte";
  import ShapeAdder from "./ShapeAdder.svelte";
  const {
    picture,
    books,
    alt,
    side = null,
    externalShapes = [],
  } = $props<{
    picture: Picture;
    alt: string;
    side?: Snippet;
    books: Array<Book>;
    externalShapes?: Array<{ shape: Coords; title: string; href: string }>;
  }>();

  const sideStore = writable<Snippet | null>(side);
  setContext("side", sideStore);
  let _sideState = $state(side ?? null);
  sideStore.subscribe((val) => (_sideState = val ?? side ?? null));

  let title = $state(alt);
  const pageTitle = writable(alt);
  setContext("title", pageTitle);
  pageTitle.subscribe((val) => (title = val));

  let canvas: HTMLCanvasElement | null = $state(null);
  const canvasStore = writable<HTMLCanvasElement | null>(null);
  setContext("pageCanvas", canvasStore);
  canvasStore.subscribe((v) => (canvas = v));

  let ratio = $state(1);
  const ratioStore = writable<number>(1);
  setContext("pageRatio", ratioStore);
  ratioStore.subscribe((v) => (ratio = v));
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="container">
  <ImgOverlay {alt} {picture} mapId="shelves">
    {#each books as book}
      <BookArea
        title={book.title}
        recommended={book.recommended}
        author={book.author}
        coords={book.coords}
        html={book.html}
      />
    {/each}
    {#each externalShapes as { shape, title, href }}
      <HoverableArea
        setStyle={defaultStyle}
        coords={shape}
        href={href || "#TODO"}
        alt={title}
        onclick={() => {
          if (!href) {
            // edit this
          }
        }}
      />
    {/each}
  </ImgOverlay>
  <div class="sidebar" style="margin: 1em ">
    <ShapeAdder {canvas} {ratio} />
    <!-- TODO: shape editor -->
    {#if _sideState !== side}
      <button
        onclick={() => {
          pushState("#", {});
          sideStore.set(side);
          pageTitle.set(alt);
        }}>close</button
      >
    {/if}
    {@render _sideState?.()}
  </div>
</div>

<style>
  /* desktop */
  /* @media (min-width: 1000px) {
    * {
      --flex-direction: row;
    }
  } */

  /* phone */
  @media (min-width: 800px) {
    * {
      --flex-direction: row;
    }
  }
  @media (max-width: 800px) {
    * {
      --flex-direction: column;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: var(--flex-direction, row);
  }
  .container > * {
    flex: 1;
  }
  .sidebar button {
    float: right;
  }
</style>
