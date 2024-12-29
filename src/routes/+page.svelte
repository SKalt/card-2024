<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import type { Coords } from "$lib/utils";
  import picture from "../../img/cropped/overall/index.jpg?enhanced";
  const alt = "Happy holidays!";
  // const externalShapes = [];
  const externalShapes = Object.values(
    import.meta.glob<true, string, { title: string; href: string; shape: Coords }>(
      "../../content/shelves/index/*.json",
      { eager: true },
    ),
  );
</script>

<Page {picture} {alt} books={[]} {externalShapes}>
  {#snippet side()}
    <div>Instructions go here</div>
  {/snippet}
</Page>
