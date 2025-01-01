<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/childrens/middle.jpg?enhanced";
  import _shapes from "../../../../content/shelves/childrens/middle.json";
  import type { Book, Coords } from "$lib/utils";
  const alt = "Harry Potter books";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/childrens/middle/*.md", { eager: true });
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
      "../../../../content/shelves/childrens/middle/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} title={alt} {books} {externalShapes}></Page>
