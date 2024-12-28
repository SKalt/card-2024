<script lang="ts">
  import type { Coords } from "../utils";
  import type { Picture } from "vite-imagetools";

  import { onMount, getContext, setContext, type Snippet, tick } from "svelte";
  import { writable } from "svelte/store";

  const { mapId, picture, alt, children } = $props<{
    mapId: string;
    picture: Picture;
    alt: string;
    children?: Snippet;
  }>();
  let ratio: number = 1;
  let canvas: HTMLCanvasElement | null = null;
  let img: HTMLImageElement | null = null;

  const ratioStore = writable(ratio);
  setContext("ratioStore", ratioStore);

  const canvasStore = writable<HTMLCanvasElement | null>(canvas);
  setContext("canvasStore", canvasStore);

  let dbg: HTMLElement;

  const handleResize = () => {
    setRatio(picture.img.w, img?.width || 1);
    if (canvas) {
      canvas.width = img!.width;
      canvas.height = img!.height;
    }
  };
  const debugMousePosition = (e: MouseEvent) => {
    dbg.textContent = (e.offsetX / ratio).toFixed(1) + "," + (e.offsetY / ratio).toFixed(1);
  };
  const setRatio = (pixelWidth: number, screenWidth: number) => {
    ratio = pixelWidth / (screenWidth || 1); // FIXME: this is inverted
    ratioStore.set(ratio);
    // console.log(`set ratio to ${ratio}`, { pixelWidth, screenWidth });
  };
  onMount(() => {
    const waitForImg = () => {
      if (img) handleResize();
      else tick().then(waitForImg);
    };
    waitForImg();

    const waitForCanvas = () => {
      if (canvas) canvasStore.set(canvas);
      else tick().then(waitForCanvas);
    };
    waitForCanvas();
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
    position: relative;
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
  @media (min-width: 800px) {
    .container {
      max-width: var(--width, 50vw);
    }
    .enhanced-img {
      max-height: var(--height, 100vh);
    }
  }

  /* phone layout */
  @media (max-width: 800px) {
    .container {
      max-width: var(--width, 100vw);
    }
    .enhanced-img {
      /* take up half the screen */
      max-height: var(--height, 50vh);
    }
  }
</style>
