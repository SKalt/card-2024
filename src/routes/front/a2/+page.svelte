<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/front/a2.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
  const md = import.meta.glob<
    true,
    string,
    {
      attributes: { title: string; author: string; shape: Coords; recommended?: boolean };
      html: string;
    }
  >("../../../../content/shelves/front/a2/*.md", { eager: true });
  const books: Book[] = Object.values(md).map((b) => {
    return {
      title: b.attributes.title,
      author: b.attributes.author,
      coords: b.attributes.shape,
      recommended: b.attributes.recommended ?? false,
      html: b.html,
    };
  });
  const alt = "Discworld books";
  // import _shapes from "../../../../content/shelves/front/a2.json";
  // const externalShapes = _shapes
  //   .map((s) =>
  //     s
  //       .map((poly) => ({ shape: poly as Coords, title: "", href: "" }))
  //       .reduce((a: { shape: Coords }[], r) => a.concat(r), []),
  //   )
  //   .reduce((a: { shape: Coords }[], r) => a.concat(r), []) as {
  //   shape: Coords;
  //   title: string;
  //   href: string;
  // }[];
  const _shapes = import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
    "../../../../content/shelves/front/a2/*.json",
    { eager: true },
  );
  const externalShapes = Object.values(_shapes);
</script>

<Page {picture} {alt} {books} {externalShapes}></Page>
