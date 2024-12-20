<script lang="ts">
  import type { Coords } from "../utils";
  import type { Picture } from "vite-imagetools";

  import { onMount, getContext, setContext, type Snippet } from "svelte";
  import { writable } from "svelte/store";

  const ratioStore = writable<number>(1);
  setContext("ratioStore", ratioStore);
  const { mapId, picture, alt, children } = $props<{
    mapId: string;
    picture: Picture;
    alt: string;
    children?: Snippet;
  }>();
  let canvas: HTMLCanvasElement;
  const sharedContext = writable<HTMLCanvasElement | null>(null);
  setContext("canvasStore", sharedContext);
  let img: HTMLImageElement | undefined = $state();
  let dbg: HTMLElement;
  let ratio: number = 1;

  const handleResize = () => {
    setRatio(picture.img.w, img?.width || 1);
    // alert(`resized to ${ratio}`);
    if (canvas) {
      canvas.width = img!.width;
      canvas.height = img!.height;
    }
  };
  const debugMousePosition = (e: MouseEvent) => {
    dbg.textContent = (e.offsetX / ratio).toFixed(1) + "," + (e.offsetY / ratio).toFixed(1);
  };
  const setRatio = (pixelWidth: number, screenWidth: number) => {
    console.log({ pixelWidth, screenWidth });
    ratio = pixelWidth / (screenWidth || 1); // FIXME: this is inverted
    ratioStore.set(ratio);
    console.log(`set ratio to ${ratio}`);
  };
  onMount(() => {
    handleResize();
    sharedContext.set(canvas);
  });
</script>

<svelte:window on:resize={handleResize} />

<div class="container">
  <map name={mapId}>
    {@render children?.()}
  </map>
  <enhanced:img
    class="enhanced-img"
    src={picture}
    {alt}
    usemap="#{mapId}"
    onload={handleResize}
    onresize={handleResize}
    bind:this={img}
  />
  <!--
      onmousemove={debugMousePosition}
  -->
  <canvas bind:this={canvas} style="pointer-events: none"></canvas>
  <span bind:this={dbg}></span>
</div>

<style>
  div.container {
    overflow: scroll;
    margin: 0;
    padding: 0;
    display: inline-block;

    /* min-width: 1600px; */
  }
  span {
    display: none;
    position: fixed;
    background-color: #fff;
    color: #000;
    bottom: 1;
    left: 0;
    font-family: monospace;
    font-size: larger;
  }
  canvas,
  .enhanced-img {
    width: auto;
    /* max-width: 100%; */
    opacity: 1;
    object-fit: cover;
    /* position: absolute; */
    /* max-width: 100%; */
    /* display: block;
    margin: auto; */
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  /* tablet/desktop layout */
  @media (min-width: 1000px) {
    .container {
      width: var(--width, 50vw);
    }
    .enhanced-img {
      max-height: var(--height, 100vh);
    }
  }

  /* phone layout */
  @media (max-width: 1000px) {
    .container {
      width: var(--width, 100vw);
    }
    .enhanced-img {
      /* take up half the screen */
      max-height: var(--height, 50vh);
    }
  }
</style>
