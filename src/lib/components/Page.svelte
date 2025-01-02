<script lang="ts">
  import { base } from "$app/paths";

  import { onMount, setContext, type Snippet } from "svelte";
  import type { Picture } from "vite-imagetools";
  import ImgOverlay from "./ImgOverlay.svelte";
  import HoverableArea from "./HoverableArea.svelte";
  import BookArea from "./BookArea.svelte";
  import { defaultStyle, snake_case, type Book, type Coords } from "$lib/utils";
  import { writable } from "svelte/store";
  import { goto, pushState } from "$app/navigation";
  import HamburgerNav from "./HamburgerNav.svelte";
  import { page } from "$app/state";
  const {
    picture,
    books,
    title,
    htmlTitle, // HACK: I got fancy with one particular title.
    side = null,
    externalShapes = [],
  }: {
    picture: Picture;
    title: string;
    htmlTitle?: string;
    side?: Snippet | null;
    books: Array<Book>;
    externalShapes?: Array<{ shape: Coords; title: string; href: string }>;
  } = $props();

  const sideStore = writable<Snippet | null>(side);
  setContext("side", sideStore);
  let _sideState = $state(side ?? null);
  sideStore.subscribe((val) => (_sideState = val ?? side ?? null));

  // for shape editor
  // import ShapeAdder from "./ShapeAdder.svelte";
  // let canvas: HTMLCanvasElement | null = $state(null);
  // const canvasStore = writable<HTMLCanvasElement | null>(null);
  // setContext("pageCanvas", canvasStore);
  // canvasStore.subscribe((v) => (canvas = v));
  // let ratio = $state(1);
  // const ratioStore = writable<number>(1);
  // setContext("pageRatio", ratioStore);
  // ratioStore.subscribe((v) => (ratio = v));
  onMount(() => {
    globalThis.addEventListener("hashchange", (e) => {
      if (!globalThis.location.hash) {
        sideStore.set(null);
      }
    });
  });
</script>

<svelte:head>
  <title>{page.state.title ?? title}</title>
</svelte:head>
<div class="container">
  <ImgOverlay {title} {picture} mapId="shelves">
    {#each books as book}
      <BookArea
        title={book.title}
        recommended={book.recommended ?? false}
        author={book.author ?? ""}
        coords={book.coords}
        html={book.html}
      />
    {/each}
    {#each externalShapes as { shape, title, href }}
      <HoverableArea
        setStyle={defaultStyle}
        coords={shape}
        href={base + (href || "")}
        onclick={(e) => {
          e.preventDefault();
          console.log("pushing state", { title });
          goto(base + href, { state: { title } });
        }}
        {title}
      />
    {/each}
  </ImgOverlay>
  <div class="sidebar" style="margin: 1em ">
    <HamburgerNav />
    <!-- <ShapeAdder {canvas} {ratio} /> -->
    {#if _sideState === side}
      <h1>
        {#if htmlTitle}{@html htmlTitle}{:else}{title}{/if}
      </h1>
      {@render _sideState?.()}
      {#if books.length > 0}
        <h2>Books</h2>
        <ul class="book-list">
          {#each books
            .filter((b) => !b.easter_egg)
            .sort((a, b) => (a.title > b.title ? 1 : -1)) as book}
            <li>
              <a
                onclick={(e) => {
                  e.preventDefault();
                  pushState(`#${snake_case(book.title ?? "")}`, { title: book.title });
                }}
                href={`#${snake_case(book.title ?? "")}`}
              >
                {book.title}
              </a>
              {#if book.recommended}
                <span title="recommended">🌟</span>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    {:else}
      <button
        onclick={() => {
          pushState("#", {});
          sideStore.set(side);
        }}>close</button
      >
      {@render _sideState?.()}
    {/if}
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
      width: 100%;
      max-height: 100vh;
      overflow-y: scroll;
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
  ul.book-list {
    margin-bottom: 2em;
  }
</style>
