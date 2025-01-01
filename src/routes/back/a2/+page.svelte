<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/back/a2.jpg?enhanced";
  import _shapes from "../../../../content/shelves/back/a2.json";
  import type { Book, Coords } from "$lib/utils";
  import title from "./title";
  const books: Book[] = _shapes
    .map((multiPoly, i) =>
      multiPoly
        .map(
          (poly, j): Book => ({
            title: `${i}/${j}`,
            author: "???",
            coords: poly as Coords,
            recommended: false,
          }),
        )
        .reduce((a: Book[], r) => {
          a.push(r);
          return a;
        }, []),
    )
    .reduce((a: Book[], r) => a.concat(r), []);
</script>

<Page {picture} {title} {books}></Page>
