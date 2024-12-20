<script lang="ts">
  import ImgOverlay from "$lib/components/ImgOverlay.svelte";
  import imgSrc from "../../img/cropped/overall/index.jpg?enhanced";
</script>

<div class="container">
  <ImgOverlay alt="Happy holidays!" picture={imgSrc} mapId="shelves"></ImgOverlay>
  <div style="margin: .5em ">
    <!-- TODO: instructions -->
    Instructions go here
  </div>
</div>

<style>
  /* desktop */
  /* @media (min-width: 1000px) {
    * {
      --flex-direction: row;
    }
  } */

  /* phone */
  @media (max-width: 1000px) {
    * {
      --flex-direction: column;
    }
  }
  .container {
    display: flex;
    flex-direction: var(--flex-direction, row);
  }
</style>
