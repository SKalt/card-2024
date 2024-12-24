<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import type { Picture } from "vite-imagetools";
  import ImgOverlay from "./ImgOverlay.svelte";
  import BookArea from "./BookArea.svelte";
  import type { Book } from "$lib/utils";
  import { writable } from "svelte/store";
  const { picture, books, alt, side } = $props<{
    picture: Picture;
    alt: string;
    side?: Snippet;
    books: Array<Book>;
  }>();

  // handle book reviews
  const sideStore = writable<Snippet | null>(side);
  setContext("side", sideStore);

  let _sideState = $state(side ?? null);
  sideStore.subscribe((val) => {
    _sideState = val ?? side ?? null;
  });
</script>

<div class="container">
  <ImgOverlay {alt} {picture} mapId="shelves">
    {#each books as book}
      <BookArea
        title={book.title}
        recommended={book.recommended}
        author={book.author}
        coords={book.coords}
      ></BookArea>
    {/each}
  </ImgOverlay>
  <div style="margin: .5em ">
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
      --flex-direction: column;
    }
  }
  @media (max-width: 800px) {
    * {
      --flex-direction: row;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: var(--flex-direction, row);
  }
</style>
