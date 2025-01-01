<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import title from "./title";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/front/a0/*.md", { eager: true });
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
      "../../../../content/shelves/front/a0/*.json",
      { eager: true },
    ),
  );
  import picture from "../../../../img/cropped/front/a0.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
</script>

<Page {picture} {title} {books} {externalShapes}></Page>
