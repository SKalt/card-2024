<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import picture from "../../../../img/cropped/front/bean.jpg?enhanced";
  const alt = "Bean";
  const books: any = [];
  const externalShapes: any = [];
  // TODO: crop further, maybe link a photo album of the boys
</script>

<Page {picture} {alt} {books} {externalShapes}>
  {#snippet side()}
    <p>He's beautiful</p>
    <!-- , and helped a bunch with this project -->
  {/snippet}
</Page>
