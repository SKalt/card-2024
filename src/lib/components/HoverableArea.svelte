<script lang="ts">
  import type { Readable, Writable } from "svelte/store";
  import { clear, type Coords, drawShape } from "../utils";
  import { getContext, hasContext, onMount, tick, type Snippet } from "svelte";
  import ShapeEditor from "./ShapeEditor.svelte";

  const {
    setStyle,
    href = "",
    alt = "",
    coords = [],
    onclick = () => {},
  }: {
    setStyle: (ctx: CanvasRenderingContext2D) => void;
    href: string;
    alt: string;
    coords: Coords;
    onclick: (e: MouseEvent) => void;
  } = $props();

  let ratio: number = $state(1);
  const ratioStore: Readable<number> = getContext("ratioStore");
  let canvas: HTMLCanvasElement | null = $state(null);
  const canvasStore: Readable<HTMLCanvasElement | null> = getContext("canvasStore");

  let transformedCoords = $state(coords);
  let strCoords = $state(coords.map((coord) => coord.join(",")).join(","));

  ratioStore.subscribe((r) => {
    ratio = r;
    transformedCoords = coords.map((coord) => coord.map((n) => n / ratio) as [number, number]);
    strCoords = transformedCoords.map((coord) => coord.join(",")).join(",");
  });
  canvasStore.subscribe((c) => (canvas = c));

  const onmouseenter = () => {
    if (canvas) drawShape(canvas, transformedCoords, setStyle);
  };
  const onmouseleave = () => {
    if (canvas) clear(canvas);
  };

  const sideStore: Writable<Snippet | null> | undefined = getContext("side");
  const y = side;
  const oncontextmenu = (e: MouseEvent) => {
    e.preventDefault();
    if (sideStore) {
      sideStore.set(y);
    }
  };
</script>

{#snippet side()}
  <ShapeEditor {coords} {ratio} {canvas} />
{/snippet}

<area
  shape="poly"
  coords={strCoords}
  {alt}
  title={alt}
  {href}
  {onmouseenter}
  {onmouseleave}
  {onclick}
  {oncontextmenu}
  data-ratio={ratio}
  data-side-defined={!!side}
/>
