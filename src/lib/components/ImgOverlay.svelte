<script lang="ts">
  import type { Coords } from "../utils";
  import type { Picture } from "vite-imagetools";

  import { onMount, getContext, setContext, type Snippet, tick, hasContext } from "svelte";
  import { writable, type Writable } from "svelte/store";

  const { mapId, picture, alt, children } = $props<{
    mapId: string;
    picture: Picture;
    alt: string;
    children?: Snippet;
  }>();
  let ratio: number = 1;
  let canvas: HTMLCanvasElement | null = null;
  let img: HTMLImageElement | null = $state(null);
  let container: HTMLDivElement | null = null;

  const ratioStore = writable(ratio);
  setContext("ratioStore", ratioStore);

  const canvasStore = writable<HTMLCanvasElement | null>(canvas);
  setContext("canvasStore", canvasStore);

  if (hasContext("pageCanvas")) {
    const parentCanvasStore: Writable<HTMLCanvasElement | null> = getContext("pageCanvas");
    canvasStore.subscribe((v) => parentCanvasStore.set(v));
  }
  if (hasContext("pageRatio")) {
    const parentRatioStore: Writable<number> = getContext("pageRatio");
    ratioStore.subscribe((v) => parentRatioStore.set(v));
  }

  let dbg: HTMLElement;
  let hasHorizontalScrollbar = $state(false);
  let hasVerticalScrollbar = $state(false);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  const onscroll = () => {
    if (!container) throw new Error("img not found");
    if (hasHorizontalScrollbar) {
      canScrollLeft = container.scrollLeft != 0;
      canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth;
    }
  };
  const handleResize = () => {
    setRatio(picture.img.w, img?.width || 1);
    if (canvas) {
      canvas.width = img!.width;
      canvas.height = img!.height;
    }
    if (container) {
      if (container.scrollWidth > container.clientWidth) {
        hasHorizontalScrollbar = true;
        hasVerticalScrollbar = false;
      } else if (container.scrollHeight > container.clientHeight) {
        hasHorizontalScrollbar = false;
        hasVerticalScrollbar = true;
      }
      onscroll();
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

<div
  class="container"
  bind:this={container}
  data-left={canScrollLeft}
  data-right={canScrollRight}
  {onscroll}
>
  <map name={mapId}>
    {@render children?.()}
  </map>
  <enhanced:img
    class="enhanced-img"
    src={picture}
    {alt}
    title={alt}
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
  .container {
    --border-width: 0.25em;
    overflow: scroll;
    margin: 0 var(--border-width) 0 var(--border-width);
    padding: 0;
    display: inline-block;
    position: relative;
  }
  /* .container::after,
  .container::before {
    content: " ";
    font-family: monospace;
  }
  .container[data-right="true"]::after {
    content: ">";
  }
  .container[data-left="true"]::before {
    content: "<";
  }
  */
  .container[data-right="true"] {
    margin-right: 0;
    border-right: var(--border-width) dotted;
  }
  .container[data-left="true"] {
    margin-left: 0;
    border-left: var(--border-width) dotted;
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
      max-width: var(--width, 50vw); /* FIXME: define --width*/
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
