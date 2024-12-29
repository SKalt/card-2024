<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/front/a3.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
  const alt = "FIXME";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/front/a3/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  import _shapes from "../../../../content/shelves/front/a3.json";

  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../../../content/shelves/front/a3/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} {alt} {books} {externalShapes}></Page>
