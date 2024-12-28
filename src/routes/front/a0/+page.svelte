<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/front/a0/*.md", { eager: true });
  import picture from "../../../../img/cropped/front/a0.jpg?enhanced";
  import _shapes from "../../../../content/shelves/front/a0.json";
  import type { Book, Coords } from "$lib/utils";
  const alt = "Math & Language Textbooks";
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  console.log(books);
</script>

<Page {picture} {alt} {books}></Page>
