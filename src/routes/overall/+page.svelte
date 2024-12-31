<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../img/cropped/overall/shelf.jpg?enhanced";
  import _shapes from "../../../content/shelves/overall/shelf.json";
  import type { Book, Coords } from "$lib/utils";
  const alt = "TODO";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../content/shelves/overall/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
</script>

<Page {picture} {alt} {books}></Page>
