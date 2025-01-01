<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  // import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import picture from "../../../img/cropped/childrens/index.jpg?enhanced";
  import type { Book, Coords } from "$lib/utils";
  const alt = "Childrens' literature";
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../../content/shelves/childrens/index/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} title={alt} books={[]} {externalShapes}></Page>
