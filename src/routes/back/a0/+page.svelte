<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import _shapes from "../../../../content/shelves/back/a0.json";
  import picture from "../../../../img/cropped/back/a0.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
  import title from "./title";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/back/a0/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../../../content/shelves/back/a0/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} {title} {books} {externalShapes}></Page>
