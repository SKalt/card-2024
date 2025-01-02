<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/back/a3.jpg?enhanced";
  import _shapes from "../../../../content/shelves/back/a3.json";
  import type { Book, Coords } from "$lib/utils";
  import title from "./title";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/back/a3/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  // .concat(
  //   _shapes
  //     .map((b, i) =>
  //       b
  //         .map((c, j) => ({
  //           title: `${i}/${j}`,
  //           author: "",
  //           recommended: false,
  //           html: "",
  //           coords: c as Coords,
  //         }))
  //         .flat(2),
  //     )
  //     .flat(2),
  // );
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../../../content/shelves/back/a3/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} {title} {books} {externalShapes}></Page>
