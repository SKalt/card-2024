<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../../img/cropped/nonfiction/bottom.jpg?enhanced";
  import _shapes from "../../../../content/nonfiction/bottom.json";
  import type { Book, Coords } from "$lib/utils";
  const alt = "Discworld books";
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

<Page {picture} {alt} {books}></Page>
