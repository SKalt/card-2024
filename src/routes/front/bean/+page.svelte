<script lang="ts">
  import Page from "$lib/components/Page.svelte";
  import picture from "../../../../img/cropped/front/bean.jpg?enhanced";
  const title = "Bean";
  const books: any = [];
  const externalShapes: any = [];
  // TODO: crop further, maybe link a photo album of the boys
</script>

<Page {picture} {title} {books} {externalShapes}>
  {#snippet side()}
    <p>He's beautiful. Also, his efforts to help with this project cannot be overstated.</p>
  {/snippet}
</Page>
