<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Picture } from "vite-imagetools";
  import ImgOverlay from "./ImgOverlay.svelte";
  import BookArea from "./BookArea.svelte";
  import type { Book } from "$lib/utils";
  const { picture, books, alt, side } = $props<{
    picture: Picture;
    alt: string;
    side?: Snippet;
    books: Array<Book>;
  }>();
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
    {@render side?.()}
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
  @media (max-width: 1000px) {
    * {
      --flex-direction: column;
    }
  }
  .container {
    display: flex;
    flex-direction: var(--flex-direction, row);
  }
</style>
