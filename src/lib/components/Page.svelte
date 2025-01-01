<script lang="ts">
  import { onMount, setContext, type Snippet } from "svelte";
  import type { Picture } from "vite-imagetools";
  import ImgOverlay from "./ImgOverlay.svelte";
  import HoverableArea from "./HoverableArea.svelte";
  import BookArea from "./BookArea.svelte";
  import { defaultStyle, type Book, type Coords } from "$lib/utils";
  import { writable } from "svelte/store";
  import { pushState } from "$app/navigation";
  import ShapeAdder from "./ShapeAdder.svelte";
  import HamburgerNav from "./HamburgerNav.svelte";
  import { page } from "$app/state";
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

  // for shape editor
  // let canvas: HTMLCanvasElement | null = $state(null);
  // const canvasStore = writable<HTMLCanvasElement | null>(null);
  // setContext("pageCanvas", canvasStore);
  // canvasStore.subscribe((v) => (canvas = v));

  // let ratio = $state(1);
  // const ratioStore = writable<number>(1);
  // setContext("pageRatio", ratioStore);
  // ratioStore.subscribe((v) => (ratio = v));
</script>

<svelte:head>
  <title>{page.state.title ?? alt}</title>
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
      <HoverableArea setStyle={defaultStyle} coords={shape} href={href || "#TODO"} {title} />
    {/each}
  </ImgOverlay>
  <div class="sidebar" style="margin: 1em ">
    <HamburgerNav />
    <!-- <ShapeAdder {canvas} {ratio} /> -->
    {#if _sideState !== side}
      <button
        onclick={() => {
          pushState("#", {});
          sideStore.set(side);
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
    .sidebar {
      max-height: 100vh;
    }
  }
  @media (max-width: 800px) {
    * {
      --flex-direction: column;
    }
    .sidebar {
      max-height: 50vh;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: var(--flex-direction, row);
  }
  .sidebar {
    overflow: scroll;
  }
  .container > * {
    flex: 1;
  }
  .sidebar button {
    float: right;
  }
</style>
