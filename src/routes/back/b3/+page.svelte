<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/back/b3.jpg?enhanced";
  import _shapes from "../../../../content/shelves/back/b3.json";
  import type { Book, Coords } from "$lib/utils";
  import title from "./title";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/back/b3/*.md", { eager: true });
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
      "../../../../content/shelves/back/b3/*.json",
      { eager: true },
    ),
  );
  // const books: Book[] = _shapes
  //   .map((b, i) =>
  //     b
  //       .map((c, j) => {
  //         return {
  //           title: `${i}/${j}`,
  //           coords: c as Coords,
  //         };
  //       })
  //       .flat(),
  //   )
  //   .flat(2);
</script>

<Page {picture} {title} {books} {externalShapes}></Page>
<!-- <Page {picture} {title} {books}></Page> -->
