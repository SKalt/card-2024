<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/front/b0.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/front/b0/*.md", { eager: true });
  const _shapes = import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
    "../../../../content/shelves/front/b0/*.json",
    { eager: true },
  );
  const alt = "Books about programming";
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });

  const externalShapes = Object.values(_shapes);
</script>

<Page {picture} {alt} {books} {externalShapes}></Page>
