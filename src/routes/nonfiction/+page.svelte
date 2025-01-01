<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import type { Coords } from "$lib/utils";
  import picture from "../../../img/cropped/nonfiction/index.png?enhanced";
  const alt = "Nonfiction books";
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../../content/shelves/nonfiction/index/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} title={alt} books={[]} {externalShapes}>
  {#snippet side()}
    <div>Instructions go here</div>
  {/snippet}
</Page>
